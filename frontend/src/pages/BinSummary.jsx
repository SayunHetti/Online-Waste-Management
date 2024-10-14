import '../assets/CSS/BinSummary.css'; // Ensure you create this CSS file
const BinSummary = () => {
    return (
        <div className="bin-summary-container">
            <h2 className="bin-summary-heading">Bin Details</h2>
            <p className="bin-summary-description">
                This summary provides an overview of the different types of waste
                collected in each bin. Please ensure that only the appropriate
                materials are placed in each bin to promote effective recycling
                and waste management.
            </p>
            <div className="bin-summary-details">
                <div className="bin-summary food-waste">
                    <h3>Food Waste</h3>

                    <p className="bin-summary-description">
                        Food waste includes organic materials like fruit and vegetable scraps.
                        Proper disposal reduces greenhouse gas emissions and supports composting.
                    </p>
                </div>
                <div className="bin-summary e-waste">
                    <h3>E-Waste</h3>

                    <p className="bin-summary-description">
                        E-waste includes electronic items like computer parts and old phones.
                        Improper disposal can lead to toxic substances leaching into the environment.
                    </p>
                </div>
                <div className="bin-summary recyclable-waste">
                    <h3>Recyclable Waste</h3>

                    <p className="bin-summary-description">
                        Recyclable waste includes paper, plastic, and glass products.
                        Recycling conserves natural resources and reduces pollution.
                    </p>
                </div>
                <div className="bin-summary regular-waste">
                    <h3>Regular Waste</h3>

                    <p className="bin-summary-description">
                        Regular waste consists of non-recyclable materials like wrappers and broken items.
                        Minimizing this waste is crucial for sustainable living.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BinSummary;




