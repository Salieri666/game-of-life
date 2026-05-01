import styles from './GamePage.module.scss'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { useOutletContext } from 'react-router-dom';
import type { AppOutletContext } from '../../app/App.tsx';
import {GameField} from "../../shared/components/game-field/GameField.tsx";

export default function GamePage() {
    const size = 50;
    const { isSimulationRunning, setIsSimulationRunning } = useOutletContext<AppOutletContext>();
    const createEmptyField = () =>
        Array.from({ length: size }, () =>
            Array.from({ length: size }, () => false)
        );
    const [gameField, setGameField] = useState<boolean[][]>(
        createEmptyField()
    );

    const handleCellClick = (row: number, col: number) => {
        if (isSimulationRunning) {
            return;
        }

        setGameField((currentField) =>
            currentField.map((currentRow, rowIndex) =>
                currentRow.map((cell, colIndex) => {
                    if (rowIndex === row && colIndex === col) {
                        return !cell;
                    }

                    return cell;
                })
            )
        );
    };

    const handleReset = () => {
        setGameField(createEmptyField());
        setIsSimulationRunning(false);
    };

    return (
        <div className={styles.GamePage}>
            <div className={styles.gameLayout}>
                <GameField field={gameField} onCellClick={handleCellClick} />
                <Stack className={styles.controls} spacing={1.5}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => setIsSimulationRunning(true)}
                    >
                        Start simulation
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setIsSimulationRunning(false)}
                    >
                        Stop simulation
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Stack>
            </div>
        </div>
    );
};
