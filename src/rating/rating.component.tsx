import { Props, render } from "springtype/dist";
import './rating.scss';

export interface RatingProps extends Props {
    rating: number;
    maxRating: number;
    onSelectionChange: (rating: number) => void;
}

export function Rating({ rating, onSelectionChange, maxRating }: RatingProps) {
    const iterations = Array.from({length: maxRating}).map((_, i) => i);

    function onMouseOver(index: number): void {
       // set highlighted classes on stars
        document.querySelectorAll('.star').forEach((star: HTMLDivElement) => {
            if (+star.dataset.index <= index) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }

    function onClick(index: number): void {
        onSelectionChange(index);
    }

    function render() {
        return <div class="stars-container">
            {
                iterations.map((i) => {
                    return <div
                        data-index={i}
                        class={"star" + (i < rating ? ' filled' : '')}
                        onMouseOver={() => onMouseOver(i)}
                        onClick={() => onClick(i)}
                    />
                })
            }
        </div>
    }

    return render();
}
