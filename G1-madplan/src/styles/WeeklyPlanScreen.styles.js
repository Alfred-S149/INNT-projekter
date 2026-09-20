import { StyleSheet } from 'react-native';

/**
 * Styling til WeeklyPlanScreen, som viser ugens madplan og lader
 * brugeren tildele retter til de enkelte ugedage.
 */
export const weeklyPlanScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    paddingVertical: 12,
  },
  emptyStateBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fef3c7',
  },
  emptyStateBannerText: {
    color: '#92400e',
    fontSize: 14,
    textAlign: 'center',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dayName: {
    width: 80,
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  dayRecipeButton: {
    flex: 1,
    paddingVertical: 6,
  },
  dayRecipeButtonText: {
    fontSize: 15,
    color: '#2563eb',
  },
  dayRecipeButtonTextPlaceholder: {
    fontSize: 15,
    color: '#9ca3af',
  },
  removeButtonText: {
    fontSize: 13,
    color: '#dc2626',
    marginLeft: 8,
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
  modalRecipeOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalRecipeOptionText: {
    fontSize: 16,
    color: '#111827',
  },
  modalRecipeOptionCategory: {
    marginTop: 2,
    fontSize: 13,
    color: '#6b7280',
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
  shoppingListHeaderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  shoppingListHeaderButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
  },
  shoppingListEmptyText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 24,
  },
  shoppingListRecipeSection: {
    marginBottom: 16,
  },
  shoppingListRecipeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  shoppingListIngredientLine: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
});
