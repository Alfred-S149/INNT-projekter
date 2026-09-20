import { StyleSheet } from 'react-native';

/**
 * Styling til FavoriteRecipesScreen, som viser listen over gemte
 * favoritretter.
 */
export const favoriteRecipesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    paddingVertical: 12,
  },
  sectionHeaderText: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
});
