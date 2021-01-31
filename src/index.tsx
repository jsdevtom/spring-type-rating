import {Props, Ref, render, renderOnReady, st} from "springtype/dist";
import {Rating} from "./rating/rating.component";

export interface SomeFunctionalComponentProps extends Props {
    frameworkName: string;
}

const FunctionalComponent = ({frameworkName, children}: SomeFunctionalComponentProps) => {

    const messageContainerRef: Ref = {};
    const ratingContainerRef: Ref = {};
    let rating = 4;

    function onButtonClick() {
        messageContainerRef.current.innerHTML = '';

        st.renderer.render(<span>Hello, {frameworkName}!
            {children}
        </span>, messageContainerRef.current);
    }

    function onSelectionChange(index: number): void {
        rating = index;

        ratingContainerRef.current.innerHTML = '';

        st.renderer.render(renderRatingComponent(), ratingContainerRef.current);
    }

    function renderRatingComponent() {
        return <Rating rating={rating} maxRating={5} onSelectionChange={onSelectionChange}/>;
    }

    return <fragment>
        <div ref={messageContainerRef}/>

        <div ref={ratingContainerRef}>{renderRatingComponent()}</div>

        <button onClick={onButtonClick}>Click me</button>
    </fragment>
}

// waits for document.body to appear
// then syncs the DOM with the VDOM and
// appends the resulting top-level DOM element to <body>
renderOnReady(<FunctionalComponent frameworkName="SpringType@v3.0.0">
    <span><br/><br/><b id='someText'>And it has children :)</b><br/><br/>

        <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"/>
        </svg>
    </span>
</FunctionalComponent>);
