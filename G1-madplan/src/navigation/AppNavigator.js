import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FavoriteRecipesScreen } from '../screens/FavoriteRecipesScreen';
import { AddRecipeScreen } from '../screens/AddRecipeScreen';
import { EditRecipeScreen } from '../screens/EditRecipeScreen';
import { WeeklyPlanScreen } from '../screens/WeeklyPlanScreen';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';
import { AddRecipeTabButton } from '../components/AddRecipeTabButton';

const FavoritesStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

/**
 * Stack-navigator for favorit-fanen. Viser først listen over favoritretter,
 * og lader brugeren navigere videre til detaljevisningen for en valgt ret.
 * @returns {JSX.Element}
 */
function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="FavoriteRecipesList"
        component={FavoriteRecipesScreen}
        options={{ title: 'Mine favoritretter' }}
      />
      <FavoritesStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Detaljer om retten' }}
      />
      <FavoritesStack.Screen
        name="EditRecipe"
        component={EditRecipeScreen}
        options={{ title: 'Rediger ret' }}
      />
    </FavoritesStack.Navigator>
  );
}

/**
 * Rod-navigator for hele appen. Bruger bundfaner (bottom tabs) til at
 * skifte mellem de tre hovedområder: favoritliste (med detaljevisning),
 * tilføj ret, og ugeplan.
 * @returns {JSX.Element}
 */
export function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#9ca3af',
        }}
      >
        <BottomTabs.Screen
          name="Favoritter"
          component={FavoritesStackNavigator}
          options={{
            title: 'Favoritter',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={size} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="TilføjRet"
          component={AddRecipeScreen}
          options={{
            title: 'Tilføj ret',
            headerShown: true,
            tabBarButton: (props) => <AddRecipeTabButton {...props} />,
          }}
        />
        <BottomTabs.Screen
          name="Ugeplan"
          component={WeeklyPlanScreen}
          options={{
            title: 'Ugeplan',
            headerShown: true,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
