import { useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { categorySelectorStyles } from '../styles/CategorySelector.styles';

/**
 * Genbrugelig komponent til at vælge en gruppe for en ret, oprette nye
 * grupper, og administrere (omdøbe/slette) eksisterende grupper. Bruges
 * både på "Tilføj ret" og "Rediger ret"-skærmene.
 * @param {Object} props
 * @param {string[]} props.recipeCategories - Alle grupper brugeren har oprettet.
 * @param {string|null} props.selectedCategoryName - Den gruppe der aktuelt er valgt for retten, eller null.
 * @param {Function} props.onSelectCategory - Kaldes med gruppens navn, når brugeren trykker på en gruppe (toggler valget).
 * @param {Function} props.onCreateCategory - Kaldes med det nye gruppenavn, når brugeren opretter en gruppe.
 * @param {Function} props.onRenameCategory - Kaldes med (gammeltNavn, nytNavn), når brugeren omdøber en gruppe.
 * @param {Function} props.onDeleteCategory - Kaldes med gruppens navn, når brugeren sletter en gruppe.
 * @returns {JSX.Element}
 */
export function CategorySelector({
  recipeCategories,
  selectedCategoryName,
  onSelectCategory,
  onCreateCategory,
  onRenameCategory,
  onDeleteCategory,
}) {
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newCategoryNameInput, setNewCategoryNameInput] = useState('');
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [categoryNameBeingRenamed, setCategoryNameBeingRenamed] = useState(null);
  const [renameCategoryInput, setRenameCategoryInput] = useState('');

  /**
   * Åbner eller lukker det lille skema til at oprette en ny gruppe.
   * @returns {void}
   */
  function handleToggleCreateCategoryForm() {
    setIsCreatingNewCategory((previousValue) => !previousValue);
    setNewCategoryNameInput('');
  }

  /**
   * Opretter den nye gruppe og lukker skemaet til at oprette grupper igen.
   * @returns {void}
   */
  function handleSubmitNewCategory() {
    const trimmedCategoryName = newCategoryNameInput.trim();
    if (trimmedCategoryName.length === 0) {
      return;
    }
    onCreateCategory(trimmedCategoryName);
    setNewCategoryNameInput('');
    setIsCreatingNewCategory(false);
  }

  /**
   * Starter omdøbning af en gruppe i administrations-vinduet.
   * @param {string} categoryName - Gruppen der skal omdøbes.
   * @returns {void}
   */
  function handleStartRenamingCategory(categoryName) {
    setCategoryNameBeingRenamed(categoryName);
    setRenameCategoryInput(categoryName);
  }

  /**
   * Gemmer det nye navn for gruppen der er ved at blive omdøbt.
   * @returns {void}
   */
  function handleConfirmRenameCategory() {
    onRenameCategory(categoryNameBeingRenamed, renameCategoryInput);
    setCategoryNameBeingRenamed(null);
    setRenameCategoryInput('');
  }

  /**
   * Beder brugeren bekræfte, at en gruppe skal slettes permanent, før den
   * rent faktisk slettes.
   * @param {string} categoryName - Gruppen der skal slettes.
   * @returns {void}
   */
  function handleConfirmDeleteCategory(categoryName) {
    Alert.alert(
      'Slet gruppe',
      `Er du sikker på at du vil slette gruppen "${categoryName}"? Retter i gruppen bliver ikke slettet, men mister gruppen igen.`,
      [
        { text: 'Annuller', style: 'cancel' },
        { text: 'Slet', style: 'destructive', onPress: () => onDeleteCategory(categoryName) },
      ]
    );
  }

  return (
    <View>
      <View style={categorySelectorStyles.categoryChipsContainer}>
        {recipeCategories.map((categoryName) => {
          const isSelected = selectedCategoryName === categoryName;
          return (
            <TouchableOpacity
              key={categoryName}
              style={[
                categorySelectorStyles.categoryChip,
                isSelected && categorySelectorStyles.categoryChipSelected,
              ]}
              onPress={() => onSelectCategory(categoryName)}
            >
              <Text
                style={[
                  categorySelectorStyles.categoryChipText,
                  isSelected && categorySelectorStyles.categoryChipTextSelected,
                ]}
              >
                {categoryName}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[categorySelectorStyles.categoryChip, categorySelectorStyles.newCategoryChip]}
          onPress={handleToggleCreateCategoryForm}
        >
          <Text style={categorySelectorStyles.newCategoryChipText}>
            {isCreatingNewCategory ? 'Annuller' : '+ Ny gruppe'}
          </Text>
        </TouchableOpacity>
      </View>

      {isCreatingNewCategory && (
        <View style={categorySelectorStyles.newCategoryRow}>
          <TextInput
            style={categorySelectorStyles.newCategoryInput}
            placeholder="Navn på ny gruppe, fx Sunde retter"
            value={newCategoryNameInput}
            onChangeText={setNewCategoryNameInput}
            autoFocus
          />
          <TouchableOpacity
            style={categorySelectorStyles.createCategoryButton}
            onPress={handleSubmitNewCategory}
          >
            <Text style={categorySelectorStyles.createCategoryButtonText}>Opret</Text>
          </TouchableOpacity>
        </View>
      )}

      {recipeCategories.length > 0 && (
        <TouchableOpacity
          style={categorySelectorStyles.manageCategoriesLink}
          onPress={() => setIsManagingCategories(true)}
        >
          <Text style={categorySelectorStyles.manageCategoriesLinkText}>Redigér grupper</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={isManagingCategories}
        animationType="slide"
        transparent
        onRequestClose={() => setIsManagingCategories(false)}
      >
        <View style={categorySelectorStyles.modalOverlay}>
          <View style={categorySelectorStyles.modalContent}>
            <Text style={categorySelectorStyles.modalTitle}>Redigér grupper</Text>

            {recipeCategories.map((categoryName) => (
              <View key={categoryName} style={categorySelectorStyles.categoryManagementRow}>
                {categoryNameBeingRenamed === categoryName ? (
                  <>
                    <TextInput
                      style={categorySelectorStyles.categoryRenameInput}
                      value={renameCategoryInput}
                      onChangeText={setRenameCategoryInput}
                      autoFocus
                    />
                    <TouchableOpacity onPress={handleConfirmRenameCategory}>
                      <Text style={categorySelectorStyles.categoryManagementActionText}>Gem</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={categorySelectorStyles.categoryManagementName}>
                      {categoryName}
                    </Text>
                    <TouchableOpacity
                      style={categorySelectorStyles.categoryManagementAction}
                      onPress={() => handleStartRenamingCategory(categoryName)}
                    >
                      <Text style={categorySelectorStyles.categoryManagementActionText}>
                        Omdøb
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={categorySelectorStyles.categoryManagementAction}
                      onPress={() => handleConfirmDeleteCategory(categoryName)}
                    >
                      <Text style={categorySelectorStyles.categoryManagementDeleteText}>
                        Slet
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={categorySelectorStyles.modalCloseButton}
              onPress={() => setIsManagingCategories(false)}
            >
              <Text style={categorySelectorStyles.modalCloseButtonText}>Luk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
