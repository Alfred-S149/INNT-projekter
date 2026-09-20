import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRecipeContext } from '../context/RecipeContext';
import { formatIngredientLine } from '../utils/formatIngredient';
import { recipeDetailScreenStyles } from '../styles/RecipeDetailScreen.styles';

/**
 * Viser alle detaljer for en enkelt favoritret: navn, gruppe og
 * ingredienser. Retten findes ud fra et recipeId, som bliver sendt med
 * som navigations-parameter fra FavoriteRecipesScreen. Herfra kan
 * brugeren også redigere eller slette retten.
 * @param {Object} props
 * @param {Object} props.navigation - Navigation-objekt fra React Navigation, bruges til at åbne redigeringsskærmen og gå tilbage efter sletning.
 * @param {Object} props.route - Route-objekt fra React Navigation, indeholder params.recipeId.
 * @returns {JSX.Element}
 */
export function RecipeDetailScreen({ navigation, route }) {
  const { recipeId } = route.params;
  const { getRecipeById, handleDeleteRecipe } = useRecipeContext();
  const recipe = getRecipeById(recipeId);

  /**
   * Beder brugeren bekræfte, at retten skal slettes permanent, før den
   * rent faktisk slettes og brugeren sendes tilbage til favoritlisten.
   * @returns {void}
   */
  function handleConfirmDeleteRecipe() {
    Alert.alert(
      'Slet ret',
      `Er du sikker på at du vil slette "${recipe.name}"? Det kan ikke fortrydes.`,
      [
        { text: 'Annuller', style: 'cancel' },
        {
          text: 'Slet',
          style: 'destructive',
          onPress: () => {
            handleDeleteRecipe(recipeId);
            navigation.goBack();
          },
        },
      ]
    );
  }

  if (!recipe) {
    return (
      <View style={recipeDetailScreenStyles.container}>
        <Text style={recipeDetailScreenStyles.notFoundText}>Retten blev ikke fundet.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={recipeDetailScreenStyles.container}
      contentContainerStyle={recipeDetailScreenStyles.contentContainer}
    >
      <Text style={recipeDetailScreenStyles.recipeName}>{recipe.name}</Text>

      {recipe.category && (
        <Text style={recipeDetailScreenStyles.categoryBadge}>{recipe.category}</Text>
      )}

      <Text style={recipeDetailScreenStyles.sectionLabel}>Ingredienser</Text>
      {recipe.ingredients.length > 0 ? (
        recipe.ingredients.map((ingredient) => (
          <Text key={ingredient.id} style={recipeDetailScreenStyles.ingredientLine}>
            •  {formatIngredientLine(ingredient)}
          </Text>
        ))
      ) : (
        <Text style={recipeDetailScreenStyles.recipeDescription}>
          Der er ikke tilføjet nogen ingredienser til denne ret.
        </Text>
      )}

      <TouchableOpacity
        style={recipeDetailScreenStyles.editButton}
        onPress={() => navigation.navigate('EditRecipe', { recipeId })}
      >
        <Text style={recipeDetailScreenStyles.editButtonText}>Rediger ret</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={recipeDetailScreenStyles.deleteButton}
        onPress={handleConfirmDeleteRecipe}
      >
        <Text style={recipeDetailScreenStyles.deleteButtonText}>Slet ret</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
