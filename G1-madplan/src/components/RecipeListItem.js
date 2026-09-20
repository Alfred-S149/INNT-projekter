import { Text, TouchableOpacity } from 'react-native';
import { recipeListItemStyles } from '../styles/RecipeListItem.styles';
import { formatIngredientLine } from '../utils/formatIngredient';

/**
 * Viser en enkelt ret som et trykbart kort i favoritlisten. Bruges sammen
 * med FlatList/SectionList på Favoritliste-skærmen.
 * @param {Object} props
 * @param {{id: string, name: string, ingredients: Array<{id: string, name: string, quantity: string}>, category: (string|null)}} props.recipe - Retten der skal vises.
 * @param {Function} props.onPress - Kaldes når brugeren trykker på retten, typisk for at åbne detaljevisningen.
 * @returns {JSX.Element}
 */
export function RecipeListItem({ recipe, onPress }) {
  const ingredientsPreview = recipe.ingredients.map(formatIngredientLine).join(', ');

  return (
    <TouchableOpacity style={recipeListItemStyles.container} onPress={onPress}>
      <Text style={recipeListItemStyles.recipeName}>{recipe.name}</Text>
      {ingredientsPreview.length > 0 && (
        <Text style={recipeListItemStyles.recipeDescription} numberOfLines={2}>
          {ingredientsPreview}
        </Text>
      )}
      {recipe.category && (
        <Text style={recipeListItemStyles.categoryBadge}>{recipe.category}</Text>
      )}
    </TouchableOpacity>
  );
}
