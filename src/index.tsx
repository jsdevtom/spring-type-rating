import {Props, Ref, render, renderOnReady, st} from "springtype/dist";
import {Rating} from "./rating/rating.component";

export interface SomeFunctionalComponentProps extends Props {
    frameworkName: string;
}

const FC = ({frameworkName, children}: SomeFunctionalComponentProps) => {

    const divRef: Ref = {};
    let rating = 4;

    const onButtonClick = () => {

        divRef.current.innerHTML = '';

        st.renderer.render(<span>Hello, {frameworkName}!
            {children}
        </span>, divRef.current);
    }

    function onSelectionChange(index: number) {
        rating = index;
    }

    return <fragment>
        <div ref={divRef}/>

        <Rating rating={rating} maxRating={5} onSelectionChange={onSelectionChange}/>

        <button onClick={onButtonClick}>Click me</button>
    </fragment>
}

// waits for document.body to appear
// then syncs the DOM with the VDOM and
// appends the resulting top-level DOM element to <body>
renderOnReady(<FC frameworkName="SpringType@v3.0.0">
    <span><br/><br/><b id='someText'>And it has children :)</b><br/><br/>

        <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"/>
        </svg>
    </span>
</FC>);
