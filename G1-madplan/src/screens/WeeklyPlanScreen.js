import { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useRecipeContext } from '../context/RecipeContext';
import { WEEKDAYS } from '../constants/weekdays';
import { formatIngredientLine } from '../utils/formatIngredient';
import { weeklyPlanScreenStyles } from '../styles/WeeklyPlanScreen.styles';

/**
 * Finder de retter der er valgt mindst én dag i ugeplanen, uden gengangere,
 * og i den rækkefølge de først optræder i ugen. Bruges til at bygge
 * indkøbslisten.
 * @param {Object.<string, string|null>} weeklyMealPlan - Ugeplanen, en ret-id (eller null) pr. ugedag.
 * @param {Function} getRecipeById - Funktion der finder en ret ud fra dens id.
 * @returns {Array} De unikke retter der indgår i ugeplanen.
 */
function getRecipesInWeeklyPlan(weeklyMealPlan, getRecipeById) {
  const uniqueRecipeIds = [...new Set(Object.values(weeklyMealPlan))].filter(
    (recipeId) => recipeId !== null
  );
  return uniqueRecipeIds.map(getRecipeById).filter((recipe) => recipe !== undefined);
}

/**
 * Viser en oversigt over ugens madplan, en ret per ugedag (mandag til
 * søndag). Brugeren kan trykke på en dag for at åbne en liste over sine
 * favoritretter og vælge én til den pågældende dag, eller fjerne en
 * allerede valgt ret igen. Herfra kan brugeren også se en samlet
 * indkøbsliste ud fra de retter, der indgår i ugeplanen.
 * @param {Object} props
 * @param {Object} props.navigation - Navigation-objekt fra React Navigation, bruges til at vise "Indkøbsliste"-knappen i headeren.
 * @returns {JSX.Element}
 */
export function WeeklyPlanScreen({ navigation }) {
  const {
    favoriteRecipes,
    weeklyMealPlan,
    handleAssignRecipeToWeekday,
    handleRemoveRecipeFromWeekday,
    getRecipeById,
  } = useRecipeContext();

  // Holder styr på hvilken ugedag brugeren er ved at vælge en ret til.
  // Er null når ret-vælgeren (modal) ikke er åben.
  const [weekdayBeingEdited, setWeekdayBeingEdited] = useState(null);

  // Holder styr på om indkøbslisten (modal) er åben.
  const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);

  /**
   * Åbner ret-vælgeren for en given ugedag, hvis der findes favoritretter
   * at vælge imellem.
   * @param {string} weekday - Ugedagen der skal tildeles en ret.
   * @returns {void}
   */
  function handleOpenRecipePickerForWeekday(weekday) {
    if (favoriteRecipes.length === 0) {
      return;
    }
    setWeekdayBeingEdited(weekday);
  }

  /**
   * Gemmer den valgte ret på den ugedag der aktuelt redigeres, og lukker
   * ret-vælgeren igen.
   * @param {string} recipeId - ID på den ret brugeren har valgt.
   * @returns {void}
   */
  function handleSelectRecipeForEditedWeekday(recipeId) {
    handleAssignRecipeToWeekday(weekdayBeingEdited, recipeId);
    setWeekdayBeingEdited(null);
  }

  /**
   * Lukker ret-vælgeren uden at ændre madplanen.
   * @returns {void}
   */
  function handleCloseRecipePicker() {
    setWeekdayBeingEdited(null);
  }

  // Viser en "Indkøbsliste"-knap i skærmens header, så den altid er let
  // tilgængelig uanset hvor langt man har scrollet i ugeplanen.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={weeklyPlanScreenStyles.shoppingListHeaderButton}
          onPress={() => setIsShoppingListVisible(true)}
        >
          <Text style={weeklyPlanScreenStyles.shoppingListHeaderButtonText}>Indkøbsliste</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const recipesInWeeklyPlan = getRecipesInWeeklyPlan(weeklyMealPlan, getRecipeById);

  return (
    <View style={weeklyPlanScreenStyles.container}>
      {favoriteRecipes.length === 0 && (
        <View style={weeklyPlanScreenStyles.emptyStateBanner}>
          <Text style={weeklyPlanScreenStyles.emptyStateBannerText}>
            Tilføj mindst én favoritret, før du kan planlægge ugens madplan.
          </Text>
        </View>
      )}

      <FlatList
        data={WEEKDAYS}
        keyExtractor={(weekday) => weekday}
        contentContainerStyle={weeklyPlanScreenStyles.listContent}
        renderItem={({ item: weekday }) => {
          const assignedRecipeId = weeklyMealPlan[weekday];
          const assignedRecipe = assignedRecipeId ? getRecipeById(assignedRecipeId) : undefined;

          return (
            <View style={weeklyPlanScreenStyles.dayRow}>
              <Text style={weeklyPlanScreenStyles.dayName}>{weekday}</Text>

              <TouchableOpacity
                style={weeklyPlanScreenStyles.dayRecipeButton}
                onPress={() => handleOpenRecipePickerForWeekday(weekday)}
              >
                <Text
                  style={
                    assignedRecipe
                      ? weeklyPlanScreenStyles.dayRecipeButtonText
                      : weeklyPlanScreenStyles.dayRecipeButtonTextPlaceholder
                  }
                >
                  {assignedRecipe ? assignedRecipe.name : 'Vælg en ret'}
                </Text>
              </TouchableOpacity>

              {assignedRecipe && (
                <TouchableOpacity onPress={() => handleRemoveRecipeFromWeekday(weekday)}>
                  <Text style={weeklyPlanScreenStyles.removeButtonText}>Fjern</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />

      <Modal
        visible={weekdayBeingEdited !== null}
        animationType="slide"
        transparent
        onRequestClose={handleCloseRecipePicker}
      >
        <View style={weeklyPlanScreenStyles.modalOverlay}>
          <View style={weeklyPlanScreenStyles.modalContent}>
            <Text style={weeklyPlanScreenStyles.modalTitle}>
              Vælg en ret til {weekdayBeingEdited}
            </Text>

            <FlatList
              data={favoriteRecipes}
              keyExtractor={(recipe) => recipe.id}
              renderItem={({ item: recipe }) => (
                <TouchableOpacity
                  style={weeklyPlanScreenStyles.modalRecipeOption}
                  onPress={() => handleSelectRecipeForEditedWeekday(recipe.id)}
                >
                  <Text style={weeklyPlanScreenStyles.modalRecipeOptionText}>{recipe.name}</Text>
                  {recipe.category && (
                    <Text style={weeklyPlanScreenStyles.modalRecipeOptionCategory}>
                      {recipe.category}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={weeklyPlanScreenStyles.modalCloseButton}
              onPress={handleCloseRecipePicker}
            >
              <Text style={weeklyPlanScreenStyles.modalCloseButtonText}>Luk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isShoppingListVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsShoppingListVisible(false)}
      >
        <View style={weeklyPlanScreenStyles.modalOverlay}>
          <View style={weeklyPlanScreenStyles.modalContent}>
            <Text style={weeklyPlanScreenStyles.modalTitle}>Indkøbsliste</Text>

            {recipesInWeeklyPlan.length === 0 ? (
              <Text style={weeklyPlanScreenStyles.shoppingListEmptyText}>
                Der er ikke valgt nogen retter i ugeplanen endnu.
              </Text>
            ) : (
              <FlatList
                data={recipesInWeeklyPlan}
                keyExtractor={(recipe) => recipe.id}
                renderItem={({ item: recipe }) => (
                  <View style={weeklyPlanScreenStyles.shoppingListRecipeSection}>
                    <Text style={weeklyPlanScreenStyles.shoppingListRecipeName}>
                      {recipe.name}
                    </Text>
                    {recipe.ingredients.length === 0 ? (
                      <Text style={weeklyPlanScreenStyles.shoppingListIngredientLine}>
                        Ingen ingredienser tilføjet til denne ret.
                      </Text>
                    ) : (
                      recipe.ingredients.map((ingredient) => (
                        <Text
                          key={ingredient.id}
                          style={weeklyPlanScreenStyles.shoppingListIngredientLine}
                        >
                          •  {formatIngredientLine(ingredient)}
                        </Text>
                      ))
                    )}
                  </View>
                )}
              />
            )}

            <TouchableOpacity
              style={weeklyPlanScreenStyles.modalCloseButton}
              onPress={() => setIsShoppingListVisible(false)}
            >
              <Text style={weeklyPlanScreenStyles.modalCloseButtonText}>Luk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
