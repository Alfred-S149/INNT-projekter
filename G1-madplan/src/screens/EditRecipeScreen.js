import { useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRecipeContext } from '../context/RecipeContext';
import { CategorySelector } from '../components/CategorySelector';
import { IngredientListEditor } from '../components/IngredientListEditor';
import { editRecipeScreenStyles } from '../styles/EditRecipeScreen.styles';

/**
 * Formular hvor brugeren kan redigere en eksisterende favoritret: navn,
 * ingredienser og gruppe. Retten der redigeres findes ud fra et recipeId
 * sendt med som navigations-parameter fra RecipeDetailScreen.
 * @param {Object} props
 * @param {Object} props.navigation - Navigation-objekt fra React Navigation, bruges til at gå tilbage efter gemning.
 * @param {Object} props.route - Route-objekt fra React Navigation, indeholder params.recipeId.
 * @returns {JSX.Element}
 */
export function EditRecipeScreen({ navigation, route }) {
  const { recipeId } = route.params;
  const {
    recipeCategories,
    getRecipeById,
    handleUpdateRecipe,
    handleCreateCategory,
    handleRenameCategory,
    handleDeleteCategory,
  } = useRecipeContext();

  const recipeBeingEdited = getRecipeById(recipeId);

  const [recipeNameInput, setRecipeNameInput] = useState(recipeBeingEdited?.name ?? '');
  const [recipeIngredients, setRecipeIngredients] = useState(
    recipeBeingEdited?.ingredients ?? []
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    recipeBeingEdited?.category ?? null
  );

  /**
   * Validerer og gemmer ændringerne til retten, når brugeren trykker på
   * "Gem ændringer". Viser en fejlbesked hvis navnet mangler, ellers
   * opdateres retten (uden tomme ingrediens-linjer) og brugeren sendes
   * tilbage til detaljevisningen.
   * @returns {void}
   */
  function handleSubmitRecipeChanges() {
    const trimmedRecipeName = recipeNameInput.trim();

    if (trimmedRecipeName.length === 0) {
      Alert.alert('Manglende navn', 'Du skal give retten et navn, før ændringerne kan gemmes.');
      return;
    }

    const nonEmptyIngredients = recipeIngredients
      .map((ingredient) => ({
        ...ingredient,
        name: ingredient.name.trim(),
        quantity: ingredient.quantity.trim(),
      }))
      .filter((ingredient) => ingredient.name.length > 0);

    handleUpdateRecipe(recipeId, trimmedRecipeName, nonEmptyIngredients, selectedCategoryName);
    navigation.goBack();
  }

  /**
   * Vælger eller fravælger en gruppe for retten. Trykker man på en gruppe
   * der allerede er valgt, fjernes valget igen.
   * @param {string} categoryName - Gruppen der blev trykket på.
   * @returns {void}
   */
  function handleSelectCategory(categoryName) {
    setSelectedCategoryName((previousSelectedCategoryName) =>
      previousSelectedCategoryName === categoryName ? null : categoryName
    );
  }

  /**
   * Opretter en ny gruppe, og vælger den automatisk til retten der redigeres.
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

  // Viser en "Annuller"-knap i skærmens header, så brugeren kan lukke ned
  // uden at gemme ændringerne, også når tastaturet er åbent.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={editRecipeScreenStyles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={editRecipeScreenStyles.cancelButtonText}>Annuller</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={editRecipeScreenStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={editRecipeScreenStyles.label}>Navn på ret</Text>
        <TextInput
          style={editRecipeScreenStyles.textInput}
          placeholder="fx Spaghetti Bolognese"
          value={recipeNameInput}
          onChangeText={setRecipeNameInput}
        />

        <Text style={editRecipeScreenStyles.label}>Ingredienser (valgfrit)</Text>
        <IngredientListEditor
          ingredients={recipeIngredients}
          onChangeIngredients={setRecipeIngredients}
        />

        <Text style={editRecipeScreenStyles.label}>Gruppe (valgfrit)</Text>
        <CategorySelector
          recipeCategories={recipeCategories}
          selectedCategoryName={selectedCategoryName}
          onSelectCategory={handleSelectCategory}
          onCreateCategory={handleCreateAndSelectCategory}
          onRenameCategory={handleRenameSelectedCategory}
          onDeleteCategory={handleDeleteSelectedCategory}
        />

        <TouchableOpacity
          style={editRecipeScreenStyles.submitButton}
          onPress={handleSubmitRecipeChanges}
        >
          <Text style={editRecipeScreenStyles.submitButtonText}>Gem ændringer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
