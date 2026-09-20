import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEEKDAYS } from '../constants/weekdays';

/**
 * Nøgler brugt til at gemme data lokalt på telefonen med AsyncStorage,
 * så favoritretter og ugeplanen ikke forsvinder, når appen lukkes.
 */
const RECIPES_STORAGE_KEY = '@madplan_favorite_recipes';
const WEEKLY_PLAN_STORAGE_KEY = '@madplan_weekly_meal_plan';
const RECIPE_CATEGORIES_STORAGE_KEY = '@madplan_recipe_categories';

/**
 * React Context der deler favoritretter og ugeplan mellem alle skærme,
 * så vi undgår at sende de samme data og funktioner ned gennem mange
 * lag af komponenter (såkaldt "prop drilling").
 */
const RecipeContext = createContext(undefined);

/**
 * Opretter en tom ugeplan, hvor hver ugedag starter uden en valgt ret.
 * @returns {Object.<string, string|null>} Et objekt med en nøgle per ugedag, sat til null.
 */
function createEmptyWeeklyMealPlan() {
  const emptyWeeklyMealPlan = {};
  WEEKDAYS.forEach((weekday) => {
    emptyWeeklyMealPlan[weekday] = null;
  });
  return emptyWeeklyMealPlan;
}

/**
 * Provider-komponent der holder styr på al app-data (favoritretter og ugeplan)
 * og gør den tilgængelig for alle underliggende skærme via useRecipeContext().
 * Data indlæses fra og gemmes automatisk til AsyncStorage, så det er persistent
 * mellem app-sessioner.
 * @param {Object} props
 * @param {React.ReactNode} props.children - De komponenter der skal have adgang til contexten.
 * @returns {JSX.Element}
 */
export function RecipeProvider({ children }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(createEmptyWeeklyMealPlan());
  const [recipeCategories, setRecipeCategories] = useState([]);
  const [hasFinishedLoadingStoredData, setHasFinishedLoadingStoredData] = useState(false);

  // Indlæs eventuelt gemt data fra telefonens lager, første gang appen starter.
  useEffect(() => {
    async function loadStoredRecipeData() {
      try {
        const storedRecipesJson = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
        const storedWeeklyPlanJson = await AsyncStorage.getItem(WEEKLY_PLAN_STORAGE_KEY);
        const storedCategoriesJson = await AsyncStorage.getItem(RECIPE_CATEGORIES_STORAGE_KEY);

        if (storedRecipesJson !== null) {
          const parsedRecipes = JSON.parse(storedRecipesJson);
          // Retter gemt før ingrediens-listen blev indført har ikke et
          // "ingredients"-felt endnu, så det sikres her, at alle retter har
          // en (evt. tom) liste, så resten af appen altid kan regne med den.
          const normalizedRecipes = parsedRecipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ?? [],
          }));
          setFavoriteRecipes(normalizedRecipes);
        }
        if (storedWeeklyPlanJson !== null) {
          setWeeklyMealPlan(JSON.parse(storedWeeklyPlanJson));
        }
        if (storedCategoriesJson !== null) {
          setRecipeCategories(JSON.parse(storedCategoriesJson));
        }
      } catch (error) {
        console.warn('Kunne ikke indlæse gemt madplan-data:', error);
      } finally {
        setHasFinishedLoadingStoredData(true);
      }
    }

    loadStoredRecipeData();
  }, []);

  // Gem favoritretter igen, hver gang listen ændrer sig (efter data er indlæst).
  useEffect(() => {
    if (!hasFinishedLoadingStoredData) {
      return;
    }
    AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(favoriteRecipes)).catch((error) => {
      console.warn('Kunne ikke gemme favoritretter:', error);
    });
  }, [favoriteRecipes, hasFinishedLoadingStoredData]);

  // Gem ugeplanen igen, hver gang den ændrer sig (efter data er indlæst).
  useEffect(() => {
    if (!hasFinishedLoadingStoredData) {
      return;
    }
    AsyncStorage.setItem(WEEKLY_PLAN_STORAGE_KEY, JSON.stringify(weeklyMealPlan)).catch((error) => {
      console.warn('Kunne ikke gemme ugeplan:', error);
    });
  }, [weeklyMealPlan, hasFinishedLoadingStoredData]);

  // Gem listen over grupper igen, hver gang den ændrer sig (efter data er indlæst).
  useEffect(() => {
    if (!hasFinishedLoadingStoredData) {
      return;
    }
    AsyncStorage.setItem(RECIPE_CATEGORIES_STORAGE_KEY, JSON.stringify(recipeCategories)).catch(
      (error) => {
        console.warn('Kunne ikke gemme grupper:', error);
      }
    );
  }, [recipeCategories, hasFinishedLoadingStoredData]);

  /**
   * Tilføjer en ny ret til favoritlisten.
   * @param {string} recipeName - Navnet på retten.
   * @param {Array<{id: string, name: string, quantity: string}>} recipeIngredients - Rettens ingredienser, én linje pr. ingrediens.
   * @param {string|null} [categoryName] - Navnet på den gruppe retten hører til, eller null hvis ingen gruppe er valgt.
   * @returns {void}
   */
  function handleAddRecipe(recipeName, recipeIngredients, categoryName = null) {
    const newRecipe = {
      id: Date.now().toString(),
      name: recipeName.trim(),
      ingredients: recipeIngredients,
      category: categoryName,
    };
    setFavoriteRecipes((previousRecipes) => [...previousRecipes, newRecipe]);
  }

  /**
   * Opdaterer navn, ingredienser og gruppe for en eksisterende ret.
   * @param {string} recipeId - ID på den ret der skal opdateres.
   * @param {string} recipeName - Rettens (nye) navn.
   * @param {Array<{id: string, name: string, quantity: string}>} recipeIngredients - Rettens (nye) ingredienser.
   * @param {string|null} categoryName - Rettens (nye) gruppe, eller null hvis ingen gruppe er valgt.
   * @returns {void}
   */
  function handleUpdateRecipe(recipeId, recipeName, recipeIngredients, categoryName) {
    setFavoriteRecipes((previousRecipes) =>
      previousRecipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              name: recipeName.trim(),
              ingredients: recipeIngredients,
              category: categoryName,
            }
          : recipe
      )
    );
  }

  /**
   * Sletter en ret permanent fra favoritlisten, og fjerner den fra
   * ugeplanen alle de steder den måtte være tildelt.
   * @param {string} recipeId - ID på den ret der skal slettes.
   * @returns {void}
   */
  function handleDeleteRecipe(recipeId) {
    setFavoriteRecipes((previousRecipes) =>
      previousRecipes.filter((recipe) => recipe.id !== recipeId)
    );
    setWeeklyMealPlan((previousWeeklyMealPlan) => {
      const updatedWeeklyMealPlan = { ...previousWeeklyMealPlan };
      WEEKDAYS.forEach((weekday) => {
        if (updatedWeeklyMealPlan[weekday] === recipeId) {
          updatedWeeklyMealPlan[weekday] = null;
        }
      });
      return updatedWeeklyMealPlan;
    });
  }

  /**
   * Opretter en ny gruppe (fx "Sunde retter" eller "Cravings") som retter
   * efterfølgende kan tildeles. Gør ikke noget hvis navnet er tomt, eller
   * hvis gruppen allerede findes (uanset store/små bogstaver).
   * @param {string} categoryName - Navnet på den nye gruppe.
   * @returns {void}
   */
  function handleCreateCategory(categoryName) {
    const trimmedCategoryName = categoryName.trim();
    if (trimmedCategoryName.length === 0) {
      return;
    }

    setRecipeCategories((previousCategories) => {
      const categoryAlreadyExists = previousCategories.some(
        (existingCategoryName) =>
          existingCategoryName.toLowerCase() === trimmedCategoryName.toLowerCase()
      );
      if (categoryAlreadyExists) {
        return previousCategories;
      }
      return [...previousCategories, trimmedCategoryName];
    });
  }

  /**
   * Omdøber en eksisterende gruppe, og opdaterer alle retter der bruger
   * den, så de peger på det nye navn. Gør ikke noget hvis det nye navn er
   * tomt, eller hvis en anden gruppe allerede har det navn.
   * @param {string} oldCategoryName - Gruppens nuværende navn.
   * @param {string} newCategoryName - Det nye navn gruppen skal have.
   * @returns {void}
   */
  function handleRenameCategory(oldCategoryName, newCategoryName) {
    const trimmedNewCategoryName = newCategoryName.trim();
    if (trimmedNewCategoryName.length === 0 || trimmedNewCategoryName === oldCategoryName) {
      return;
    }

    const isNameTakenByAnotherCategory = recipeCategories.some(
      (existingCategoryName) =>
        existingCategoryName.toLowerCase() === trimmedNewCategoryName.toLowerCase() &&
        existingCategoryName !== oldCategoryName
    );
    if (isNameTakenByAnotherCategory) {
      return;
    }

    setRecipeCategories((previousCategories) =>
      previousCategories.map((existingCategoryName) =>
        existingCategoryName === oldCategoryName ? trimmedNewCategoryName : existingCategoryName
      )
    );
    setFavoriteRecipes((previousRecipes) =>
      previousRecipes.map((recipe) =>
        recipe.category === oldCategoryName
          ? { ...recipe, category: trimmedNewCategoryName }
          : recipe
      )
    );
  }

  /**
   * Sletter en gruppe permanent. Retter der havde denne gruppe bliver ikke
   * slettet, de mister bare deres gruppe igen (bliver ugrupperede).
   * @param {string} categoryName - Gruppen der skal slettes.
   * @returns {void}
   */
  function handleDeleteCategory(categoryName) {
    setRecipeCategories((previousCategories) =>
      previousCategories.filter((existingCategoryName) => existingCategoryName !== categoryName)
    );
    setFavoriteRecipes((previousRecipes) =>
      previousRecipes.map((recipe) =>
        recipe.category === categoryName ? { ...recipe, category: null } : recipe
      )
    );
  }

  /**
   * Tildeler en ret til en bestemt ugedag i madplanen.
   * @param {string} weekday - Ugedagen der skal opdateres (fx "Mandag").
   * @param {string} recipeId - ID på den ret der skal tildeles dagen.
   * @returns {void}
   */
  function handleAssignRecipeToWeekday(weekday, recipeId) {
    setWeeklyMealPlan((previousWeeklyMealPlan) => ({
      ...previousWeeklyMealPlan,
      [weekday]: recipeId,
    }));
  }

  /**
   * Fjerner den valgte ret fra en bestemt ugedag igen.
   * @param {string} weekday - Ugedagen der skal ryddes (fx "Mandag").
   * @returns {void}
   */
  function handleRemoveRecipeFromWeekday(weekday) {
    setWeeklyMealPlan((previousWeeklyMealPlan) => ({
      ...previousWeeklyMealPlan,
      [weekday]: null,
    }));
  }

  /**
   * Finder en ret ud fra dens ID.
   * @param {string} recipeId - ID på den ret der skal findes.
   * @returns {Object|undefined} Retten hvis den findes, ellers undefined.
   */
  function getRecipeById(recipeId) {
    return favoriteRecipes.find((recipe) => recipe.id === recipeId);
  }

  const contextValue = {
    favoriteRecipes,
    weeklyMealPlan,
    recipeCategories,
    handleAddRecipe,
    handleUpdateRecipe,
    handleDeleteRecipe,
    handleCreateCategory,
    handleRenameCategory,
    handleDeleteCategory,
    handleAssignRecipeToWeekday,
    handleRemoveRecipeFromWeekday,
    getRecipeById,
  };

  return <RecipeContext.Provider value={contextValue}>{children}</RecipeContext.Provider>;
}

/**
 * Hook der giver adgang til madplan-dataen (favoritretter, ugeplan og
 * funktioner til at ændre dem). Skal bruges inden i en komponent der er
 * pakket ind i en RecipeProvider.
 * @returns {{
 *   favoriteRecipes: Array<{id: string, name: string, ingredients: Array<{id: string, name: string, quantity: string}>, category: (string|null)}>,
 *   weeklyMealPlan: Object.<string, string|null>,
 *   recipeCategories: string[],
 *   handleAddRecipe: Function,
 *   handleUpdateRecipe: Function,
 *   handleDeleteRecipe: Function,
 *   handleCreateCategory: Function,
 *   handleRenameCategory: Function,
 *   handleDeleteCategory: Function,
 *   handleAssignRecipeToWeekday: Function,
 *   handleRemoveRecipeFromWeekday: Function,
 *   getRecipeById: Function
 * }}
 */
export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeContext skal bruges inden i en RecipeProvider');
  }
  return context;
}
