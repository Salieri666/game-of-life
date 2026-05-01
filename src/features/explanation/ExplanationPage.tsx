import styles from './ExplanationPage.module.scss'

const ExplanationPage = () => {
    return (
        <div className={styles.ExplanationPage}>
            <h3>Game of Life Rules</h3>
            <section className={styles.ruleGroup}>
                <p className={styles.ruleTitle}>For a space that is populated:</p>
                <p className={styles.ruleItem}>Each cell with one or no neighbors dies, as if by solitude.</p>
                <p className={styles.ruleItem}>Each cell with four or more neighbors dies, as if by overpopulation.</p>
                <p className={styles.ruleItem}>Each cell with two or three neighbors survives.</p>
            </section>

            <section className={styles.ruleGroup}>
                <p className={styles.ruleTitle}>For a space that is empty or unpopulated:</p>
                <p className={styles.ruleItem}>Each cell with three neighbors becomes populated.</p>
            </section>
        </div>
    );
};

export default ExplanationPage;
