import { Text, TouchableOpacity, View } from 'react-native';
import { addRecipeTabButtonStyles } from '../styles/AddRecipeTabButton.styles';

/**
 * Farvet primær-knap til bundmenuen, der fremhæver "Tilføj ret" som den
 * vigtigste handling i appen (i stedet for en almindelig, neutral fane).
 * Bruges som tabBarButton på "TilføjRet"-fanen i AppNavigator.
 * @param {Object} props
 * @param {Function} props.onPress - Kaldes når brugeren trykker på knappen, skifter til "Tilføj ret"-fanen.
 * @returns {JSX.Element}
 */
export function AddRecipeTabButton({ onPress }) {
  return (
    <TouchableOpacity
      style={addRecipeTabButtonStyles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={addRecipeTabButtonStyles.circle}>
        <Text style={addRecipeTabButtonStyles.plusIcon}>+</Text>
      </View>
      <Text style={addRecipeTabButtonStyles.label}>Tilføj ret</Text>
    </TouchableOpacity>
  );
}
