import { useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { useRecipeContext } from '../context/RecipeContext';
import { CategorySelector } from '../components/CategorySelector';
import { IngredientListEditor } from '../components/IngredientListEditor';
import { addRecipeScreenStyles } from '../styles/AddRecipeScreen.styles';

/**
 * Simpel formular hvor brugeren kan oprette en ny favoritret ved at angive
 * et navn, en valgfri liste af ingredienser (mængde + navn), og en valgfri
 * gruppe. Når retten gemmes, ryddes formularen, og brugeren sendes tilbage
 * til favoritlisten.
 * @param {Object} props
 * @param {Object} props.navigation - Navigation-objekt fra React Navigation, bruges til at skifte skærm efter oprettelse.
 * @returns {JSX.Element}
 */
export function AddRecipeScreen({ navigation }) {
  const {
    recipeCategories,
    handleAddRecipe,
    handleCreateCategory,
    handleRenameCategory,
    handleDeleteCategory,
  } = useRecipeContext();
  const [recipeNameInput, setRecipeNameInput] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  /**
   * Validerer og gemmer den nye ret, når brugeren trykker på "Gem ret".
   * Viser en fejlbesked hvis navnet mangler, ellers gemmes retten (uden
   * tomme ingrediens-linjer) og brugeren sendes til favoritlisten.
   * @returns {void}
   */
  function handleSubmitNewRecipe() {
    const trimmedRecipeName = recipeNameInput.trim();

    if (trimmedRecipeName.length === 0) {
      Alert.alert('Manglende navn', 'Du skal give retten et navn, før den kan gemmes.');
      return;
    }

    const nonEmptyIngredients = recipeIngredients
      .map((ingredient) => ({
        ...ingredient,
        name: ingredient.name.trim(),
        quantity: ingredient.quantity.trim(),
      }))
      .filter((ingredient) => ingredient.name.length > 0);

    handleAddRecipe(trimmedRecipeName, nonEmptyIngredients, selectedCategoryName);
    setRecipeNameInput('');
    setRecipeIngredients([]);
    setSelectedCategoryName(null);
    navigation.navigate('Favoritter');
  }

  /**
   * Annullerer oprettelsen af en ny ret: lukker tastaturet, rydder
   * formularen, og sender brugeren tilbage til favoritlisten uden at
   * gemme noget. Kan bruges selvom brugeren stadig er i gang med at
   * skrive i et af felterne.
   * @returns {void}
   */
  function handleCancelAddingRecipe() {
    Keyboard.dismiss();
    setRecipeNameInput('');
    setRecipeIngredients([]);
    setSelectedCategoryName(null);
    navigation.navigate('Favoritter');
  }

  /**
   * Vælger eller fravælger en gruppe for den nye ret. Trykker man på en
   * gruppe der allerede er valgt, fjernes valget igen.
   * @param {string} categoryName - Gruppen der blev trykket på.
   * @returns {void}
   */
  function handleSelectCategory(categoryName) {
    setSelectedCategoryName((previousSelectedCategoryName) =>
      previousSelectedCategoryName === categoryName ? null : categoryName
    );
  }

  /**
   * Opretter en ny gruppe, og vælger den automatisk til den ret der er ved
   * at blive oprettet.
   * @param {string} categoryName - Navnet på den nye gruppe.
   * @returns {void}
   */
  function handleCreateAndSelectCategory(categoryName) {
    handleCreateCategory(categoryName);
    setSelectedCategoryName(categoryName);
  }

  /**
   * Omdøber en gruppe, og opdaterer det aktuelle valg hvis det var den
   * gruppe der blev omdøbt.
   * @param {string} oldCategoryName - Gruppens tidligere navn.
   * @param {string} newCategoryName - Gruppens nye navn.
   * @returns {void}
   */
  function handleRenameSelectedCategory(oldCategoryName, newCategoryName) {
    handleRenameCategory(oldCategoryName, newCategoryName);
    setSelectedCategoryName((previousSelectedCategoryName) =>
      previousSelectedCategoryName === oldCategoryName
        ? newCategoryName.trim()
        : previousSelectedCategoryName
    );
  }

  /**
   * Sletter en gruppe, og fjerner den fra det aktuelle valg hvis den var
   * valgt.
   * @param {string} categoryName - Gruppen der skal slettes.
   * @returns {void}
   */
  function handleDeleteSelectedCategory(categoryName) {
    handleDeleteCategory(categoryName);
    setSelectedCategoryName((previousSelectedCategoryName) =>
      previousSelectedCategoryName === categoryName ? null : previousSelectedCategoryName
    );
  }

  // Viser en "Annuller"-knap i skærmens header, så brugeren altid kan
  // lukke ned igen, også når tastaturet er åbent og dækker resten af skærmen.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={addRecipeScreenStyles.cancelButton}
          onPress={handleCancelAddingRecipe}
        >
          <Text style={addRecipeScreenStyles.cancelButtonText}>Annuller</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={addRecipeScreenStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={addRecipeScreenStyles.label}>Navn på ret</Text>
        <TextInput
          style={addRecipeScreenStyles.textInput}
          placeholder="fx Spaghetti Bolognese"
          value={recipeNameInput}
          onChangeText={setRecipeNameInput}
        />

        <Text style={addRecipeScreenStyles.label}>Ingredienser (valgfrit)</Text>
        <IngredientListEditor
          ingredients={recipeIngredients}
          onChangeIngredients={setRecipeIngredients}
        />

        <Text style={addRecipeScreenStyles.label}>Gruppe (valgfrit)</Text>
        <CategorySelector
          recipeCategories={recipeCategories}
          selectedCategoryName={selectedCategoryName}
          onSelectCategory={handleSelectCategory}
          onCreateCategory={handleCreateAndSelectCategory}
          onRenameCategory={handleRenameSelectedCategory}
          onDeleteCategory={handleDeleteSelectedCategory}
        />

        <TouchableOpacity style={addRecipeScreenStyles.submitButton} onPress={handleSubmitNewRecipe}>
          <Text style={addRecipeScreenStyles.submitButtonText}>Gem ret</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
