/*
  styles/index.js
  ===============
  This file is called a **"barrel file"**.

  A barrel file re-exports items from multiple files
  so they can be imported from ONE place.

  Instead of doing this everywhere:

    import { PageContainer } from "./styles/PageContainer";
    import { Grid } from "./styles/Grid";
    import { Card } from "./styles/MovieCard";

  We can do this:

    import { PageContainer, Grid, Card } from "./styles";

  This keeps imports:
  ✅ Cleaner
  ✅ Easier to read
  ✅ Easier to refactor later
*/


export { PageContainer } from "./PageContainer";

export { Grid } from "./Grid";

export {
  Card,
  CardLink,
  Poster,
  Meta,
  Rating,
  Title,
  Muted
} from "./MovieCard";

export {
  Controls,
  Select,
  Range
} from "./Controls";
