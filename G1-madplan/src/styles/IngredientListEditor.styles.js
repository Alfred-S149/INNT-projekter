import { StyleSheet } from 'react-native';

/**
 * Styling til IngredientListEditor-komponenten, hvor brugeren indtaster
 * en ret's ingredienser, én linje ad gangen.
 */
export const ingredientListEditorStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
  },
  quantityInput: {
    width: 84,
    marginRight: 8,
  },
  nameInput: {
    flex: 1,
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  removeButtonText: {
    fontSize: 16,
    color: '#dc2626',
  },
  addButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#9ca3af',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
});
