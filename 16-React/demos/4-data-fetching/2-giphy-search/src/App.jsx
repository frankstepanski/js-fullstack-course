import GiphySearch from "./components/GiphySearch";
import "./App.css";

export default function App() {
  return (
    <>
      {/* 
        Pass an initial search term to the GiphySearch component.
        This allows the component to load content immediately
        when the app first renders.
      */}
      <GiphySearch initialQuery="cat" />
    </>
  );
}

