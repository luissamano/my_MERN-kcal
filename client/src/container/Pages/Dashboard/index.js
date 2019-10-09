import React from 'react';
import styles from "./style.module.css";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Dashboard extends React.Component {
    render () {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Consumo de calorias.</h1>
                <div className={styles.section}>
                    <h3>Listado de calorias consumidas.</h3>
                    <div className={styles.containerBtns}>
                        <Fab
                            size='medium'
                            colors='primary'
                            arial-label='Add'
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;