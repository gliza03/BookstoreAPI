import { useEffect, useState } from "react";
import './css/CategoryFilter.css';

function CategoryFilter({selectedCategories, setSelectedCategories}: {selectedCategories: string[], setSelectedCategories: (categories: string[]) => void}) {

    const [categories, setCategories] = useState<string[]>([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('http://localhost:5196/api/Book/GetBookCategories');
                const data = await response.json();
    
                setCategories(data);
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
            
        }
        fetchCategories();
    }, []);
    
    function handleCheckoutChange ({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter((c) => c !== target.value): [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }


    return (
        <>
        <div className="category-filter">
            <h2>Filter by Category</h2>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input type="checkbox" id={c} value={c} onChange={handleCheckoutChange}/>
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
        </>
    );

}

export default CategoryFilter;