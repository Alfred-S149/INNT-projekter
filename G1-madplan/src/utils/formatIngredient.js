/**
 * Formaterer én ingrediens-linje til visning, fx "400 g Hakket oksekød".
 * Hvis der ikke er angivet nogen mængde, vises kun navnet.
 * @param {{name: string, quantity: string}} ingredient - Ingrediensen der skal formateres.
 * @returns {string} Den formaterede tekst, klar til at blive vist.
 */
export function formatIngredientLine(ingredient) {
  return ingredient.quantity ? `${ingredient.quantity} ${ingredient.name}` : ingredient.name;
}
