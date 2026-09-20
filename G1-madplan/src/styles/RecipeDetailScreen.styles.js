import { StyleSheet } from 'react-native';

/**
 * Styling til RecipeDetailScreen, som viser alle detaljer for én
 * favoritret.
 */
export const recipeDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  contentContainer: {
    padding: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  ingredientLine: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
  },
  notFoundText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
  editButton: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
});
