import { StyleSheet } from 'react-native';

/**
 * Styling til RecipeListItem-komponenten, der viser en enkelt ret
 * i favoritlisten.
 */
export const recipeListItemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
  },
  recipeDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
