import { View, Text, FlatList, SectionList } from 'react-native';
import { RecipeListItem } from '../components/RecipeListItem';
import { useRecipeContext } from '../context/RecipeContext';
import { favoriteRecipesScreenStyles } from '../styles/FavoriteRecipesScreen.styles';

/**
 * Navn på den sektion der bruges til retter uden en valgt gruppe.
 * @type {string}
 */
const UNGROUPED_SECTION_TITLE = 'Ingen gruppe';

/**
 * Bygger en liste af sektioner (én per gruppe) ud fra favoritretterne, så
 * de kan vises grupperet i en SectionList. Retter uden gruppe samles i en
 * fælles "Ingen gruppe"-sektion til sidst. Grupper uden retter i vises ikke.
 * @param {Array<{id: string, name: string, description: string, category: (string|null)}>} favoriteRecipes - Alle gemte retter.
 * @param {string[]} recipeCategories - Alle grupper brugeren har oprettet, i den rækkefølge de blev oprettet.
 * @returns {Array<{title: string, data: Array}>} Sektioner klar til brug i en SectionList.
 */
function buildRecipeSectionsByCategory(favoriteRecipes, recipeCategories) {
  const sections = recipeCategories
    .map((categoryName) => ({
      title: categoryName,
      data: favoriteRecipes.filter((recipe) => recipe.category === categoryName),
    }))
    .filter((section) => section.data.length > 0);

  const ungroupedRecipes = favoriteRecipes.filter((recipe) => !recipe.category);
  if (ungroupedRecipes.length > 0) {
    sections.push({ title: UNGROUPED_SECTION_TITLE, data: ungroupedRecipes });
  }

  return sections;
}

/**
 * Viser en liste over alle gemte favoritretter. Hvis brugeren har oprettet
 * grupper (fx "Sunde retter", "Cravings"), vises retterne grupperet under
 * hver gruppe med en overskrift. Ellers vises de i en almindelig liste.
 * Hvis der endnu ikke er tilføjet nogen retter, vises en hjælpetekst i
 * stedet. Et tryk på en ret navigerer videre til detaljevisningen.
 * @param {Object} props
 * @param {Object} props.navigation - Navigation-objekt fra React Navigation, bruges til at skifte skærm.
 * @returns {JSX.Element}
 */
export function FavoriteRecipesScreen({ navigation }) {
  const { favoriteRecipes, recipeCategories } = useRecipeContext();

  /**
   * Navigerer til detaljevisningen for den valgte ret.
   * @param {{id: string}} selectedRecipe - Retten der blev trykket på.
   * @returns {void}
   */
  function handleRecipePress(selectedRecipe) {
    navigation.navigate('RecipeDetail', { recipeId: selectedRecipe.id });
  }

  if (favoriteRecipes.length === 0) {
    return (
      <View style={favoriteRecipesScreenStyles.container}>
        <View style={favoriteRecipesScreenStyles.emptyStateContainer}>
          <Text style={favoriteRecipesScreenStyles.emptyStateText}>
            Du har endnu ikke gemt nogen retter. Gå til "Tilføj ret" for at tilføje din første favorit.
          </Text>
        </View>
      </View>
    );
  }

  if (recipeCategories.length === 0) {
    return (
      <View style={favoriteRecipesScreenStyles.container}>
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(recipe) => recipe.id}
          contentContainerStyle={favoriteRecipesScreenStyles.listContent}
          renderItem={({ item: recipe }) => (
            <RecipeListItem recipe={recipe} onPress={() => handleRecipePress(recipe)} />
          )}
        />
      </View>
    );
  }

  const recipeSections = buildRecipeSectionsByCategory(favoriteRecipes, recipeCategories);

  return (
    <View style={favoriteRecipesScreenStyles.container}>
      <SectionList
        sections={recipeSections}
        keyExtractor={(recipe) => recipe.id}
        contentContainerStyle={favoriteRecipesScreenStyles.listContent}
        renderSectionHeader={({ section }) => (
          <Text style={favoriteRecipesScreenStyles.sectionHeaderText}>{section.title}</Text>
        )}
        renderItem={({ item: recipe }) => (
          <RecipeListItem recipe={recipe} onPress={() => handleRecipePress(recipe)} />
        )}
      />
    </View>
  );
}
