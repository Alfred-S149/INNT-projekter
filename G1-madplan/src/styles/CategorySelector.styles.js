import { StyleSheet } from 'react-native';

/**
 * Styling til CategorySelector-komponenten, der bruges til at vælge,
 * oprette, omdøbe og slette grupper for en ret.
 */
export const categorySelectorStyles = StyleSheet.create({
  categoryChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#2563eb',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#2563eb',
  },
  categoryChipTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  newCategoryChip: {
    borderStyle: 'dashed',
    borderColor: '#9ca3af',
  },
  newCategoryChipText: {
    fontSize: 14,
    color: '#6b7280',
  },
  newCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  newCategoryInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
  },
  createCategoryButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createCategoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  manageCategoriesLink: {
    marginTop: 2,
    marginBottom: 4,
  },
  manageCategoriesLinkText: {
    fontSize: 14,
    color: '#6b7280',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  categoryManagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryManagementName: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  categoryManagementAction: {
    marginLeft: 16,
  },
  categoryManagementActionText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  categoryManagementDeleteText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '600',
  },
  categoryRenameInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#111827',
    marginRight: 8,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 15,
    color: '#6b7280',
  },
});
