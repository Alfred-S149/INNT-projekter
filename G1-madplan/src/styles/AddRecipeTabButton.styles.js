import { StyleSheet } from 'react-native';

/**
 * Styling til AddRecipeTabButton, den farvede primær-knap i bundmenuen
 * der bruges til at tilføje en ny ret.
 */
export const addRecipeTabButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -14,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  plusIcon: {
    fontSize: 28,
    lineHeight: 30,
    color: '#ffffff',
    fontWeight: '600',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
});
