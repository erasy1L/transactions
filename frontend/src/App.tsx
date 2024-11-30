import MakeTransaction from "./features/make-transaction/ui";
import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.main}>
            <div className={styles.page}>
                <MakeTransaction />
            </div>
        </div>
    );
}

export default App;
