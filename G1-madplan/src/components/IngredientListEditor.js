import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ingredientListEditorStyles } from '../styles/IngredientListEditor.styles';

/**
 * Lader brugeren indtaste en ret's ingredienser, én linje ad gangen med
 * mængde og navn (fx "400 g" og "Hakket oksekød"). Bruges på "Tilføj ret"
 * og "Rediger ret", og ligger til grund for indkøbslisten senere.
 * @param {Object} props
 * @param {Array<{id: string, name: string, quantity: string}>} props.ingredients - De nuværende ingrediens-linjer.
 * @param {Function} props.onChangeIngredients - Kaldes med den opdaterede liste, hver gang en linje ændres, tilføjes eller fjernes.
 * @returns {JSX.Element}
 */
export function IngredientListEditor({ ingredients, onChangeIngredients }) {
  /**
   * Opdaterer mængden for én bestemt ingrediens-linje.
   * @param {string} ingredientId - ID på den linje der skal opdateres.
   * @param {string} newQuantity - Den nye mængdetekst, fx "2 stk".
   * @returns {void}
   */
  function handleChangeIngredientQuantity(ingredientId, newQuantity) {
    onChangeIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === ingredientId ? { ...ingredient, quantity: newQuantity } : ingredient
      )
    );
  }

  /**
   * Opdaterer navnet for én bestemt ingrediens-linje.
   * @param {string} ingredientId - ID på den linje der skal opdateres.
   * @param {string} newName - Det nye ingrediensnavn.
   * @returns {void}
   */
  function handleChangeIngredientName(ingredientId, newName) {
    onChangeIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === ingredientId ? { ...ingredient, name: newName } : ingredient
      )
    );
  }

  /**
   * Tilføjer en ny, tom ingrediens-linje til listen.
   * @returns {void}
   */
  function handleAddIngredientRow() {
    const newIngredient = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      quantity: '',
      name: '',
    };
    onChangeIngredients([...ingredients, newIngredient]);
  }

  /**
   * Fjerner en ingrediens-linje fra listen igen.
   * @param {string} ingredientId - ID på den linje der skal fjernes.
   * @returns {void}
   */
  function handleRemoveIngredientRow(ingredientId) {
    onChangeIngredients(ingredients.filter((ingredient) => ingredient.id !== ingredientId));
  }

  return (
    <View>
      {ingredients.map((ingredient) => (
        <View key={ingredient.id} style={ingredientListEditorStyles.row}>
          <TextInput
            style={[ingredientListEditorStyles.input, ingredientListEditorStyles.quantityInput]}
            placeholder="Mængde"
            value={ingredient.quantity}
            onChangeText={(newQuantity) =>
              handleChangeIngredientQuantity(ingredient.id, newQuantity)
            }
          />
          <TextInput
            style={[ingredientListEditorStyles.input, ingredientListEditorStyles.nameInput]}
            placeholder="Ingrediens, fx løg"
            value={ingredient.name}
            onChangeText={(newName) => handleChangeIngredientName(ingredient.id, newName)}
          />
          <TouchableOpacity
            style={ingredientListEditorStyles.removeButton}
            onPress={() => handleRemoveIngredientRow(ingredient.id)}
          >
            <Text style={ingredientListEditorStyles.removeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={ingredientListEditorStyles.addButton}
        onPress={handleAddIngredientRow}
      >
        <Text style={ingredientListEditorStyles.addButtonText}>+ Tilføj ingrediens</Text>
      </TouchableOpacity>
    </View>
  );
}
