import { ReactElement } from "react"
import Container from "./components/Container";
import Quiz from "./components/Quiz";

import "./style/style.css"
import '@fontsource/mali';

const App = ():ReactElement => (
  <Container>
    <Quiz/>
  </Container>
)
export default App;
