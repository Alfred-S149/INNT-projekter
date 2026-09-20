import { StatusBar } from 'expo-status-bar';
import { RecipeProvider } from './src/context/RecipeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

/**
 * Rod-komponent for madplan-appen. Pakker hele appen ind i RecipeProvider,
 * så alle skærme kan tilgå favoritretter og ugeplan, og sætter
 * navigationen op via AppNavigator.
 * @returns {JSX.Element}
 */
export default function App() {
  return (
    <RecipeProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </RecipeProvider>
  );
}
