// performance.js
import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress';
import { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
// sqlite
import * as SQLite from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
// safe view
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Performance_Screen({ navigation }) {
    // open database
    const db = SQLite.openDatabase('user.db');
    db.transaction(tx => {
        tx.executeSql(
            'create table if not exists GameData (Email text, GameName text, Percentage int);'
        );
    });

    const [data, setData] = useState({
        averagePercentage: 0,
        numberOfGames: 0
    });

    const [averageData, setAverageData] = useState({
        averagePercentage: 0,
        numberOfGames: 0
    });

    const [conversionData, setConversionData] = useState({
        averagePercentage: 0,
        numberOfGames: 0
    });

    const [divisionData, setDivisionData] = useState({
        averagePercentage: 0,
        numberOfGames: 0
    });

    const [detailsData, setDetailData] = useState({
        averagePercentage: 0,
        numberOfGames: 0
    });

    const [commasData, setCommasData] = useState({
        averagePercentage: 0,
        numberOfGames: 0
    });

    const [refreshing, setRefreshing] = useState(false);

    // get email from AsyncStorage
    const [email, setEmail] = useState('');
    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                setEmail(value);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEmail();
    }, []);

    const getAveragePercentage = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT AVG(Percentage) AS AveragePercentage, COUNT(Percentage) AS NumberOfGames FROM GameData WHERE Email=? AND GameName=?',
                    [email, 'Percentages'],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0));
                        } else {
                            resolve(false);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        });
    };

    const updateData = async () => {
        try {
            const result = await getAveragePercentage();
            if (result) {
                setData({
                    averagePercentage: Math.round(result.AveragePercentage),
                    numberOfGames: Math.round(result.NumberOfGames)
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        updateData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(updateData, 5000);
            return () => clearInterval(intervalId);
        }, [])
    );

    // do the same for Averages
    const getAveragePercentage_Averages = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT AVG(Percentage) AS AveragePercentage, COUNT(Percentage) AS NumberOfGames FROM GameData WHERE Email=? AND GameName=?',
                    [email, 'Averages'],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0));
                        } else {
                            resolve(false);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        });
    }

    const updateData_Averages = async () => {
        try {
            const result = await getAveragePercentage_Averages();
            if (result) {
                setAverageData({
                    averagePercentage: Math.round(result.AveragePercentage),
                    numberOfGames: Math.round(result.NumberOfGames)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateData_Averages();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(updateData_Averages, 5000);
            return () => clearInterval(intervalId);
        }
        )
    );

    // now do the same for Conversions
    const getAveragePercentage_Conversions = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT AVG(Percentage) AS AveragePercentage, COUNT(Percentage) AS NumberOfGames FROM GameData WHERE Email=? AND GameName=?',
                    [email, 'Conversions'],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0));
                        } else {
                            resolve(false);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        }
        );
    }

    const updateData_Conversions = async () => {
        try {
            const result = await getAveragePercentage_Conversions();
            if (result) {
                setConversionData({
                    averagePercentage: Math.round(result.AveragePercentage),
                    numberOfGames: Math.round(result.NumberOfGames)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateData_Conversions();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(updateData_Conversions, 5000);
            return () => clearInterval(intervalId);
        }
        )
    );

    // now do the same for Divisions
    const getAveragePercentage_Divisions = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT AVG(Percentage) AS AveragePercentage, COUNT(Percentage) AS NumberOfGames FROM GameData WHERE Email=? AND GameName=?',
                    [email, 'Divisions'],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0));
                        } else {
                            resolve(false);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        }
        );
    }

    const updateData_Divisions = async () => {
        try {
            const result = await getAveragePercentage_Divisions();
            if (result) {
                setDivisionData({
                    averagePercentage: Math.round(result.AveragePercentage),
                    numberOfGames: Math.round(result.NumberOfGames)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateData_Divisions();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(updateData_Divisions, 5000);
            return () => clearInterval(intervalId);
        }
        )
    );

    // now do the same for Details
    const getAveragePercentage_Details = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT AVG(Percentage) AS AveragePercentage, COUNT(Percentage) AS NumberOfGames FROM GameData WHERE Email=? AND GameName=?',
                    [email, 'Details'],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0));
                        } else {
                            resolve(false);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        }
        );
    }

    const updateData_Details = async () => {
        try {
            const result = await getAveragePercentage_Details();
            if (result) {
                setDetailData({
                    averagePercentage: Math.round(result.AveragePercentage),
                    numberOfGames: Math.round(result.NumberOfGames)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateData_Details();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(updateData_Details, 5000);
            return () => clearInterval(intervalId);
        }
        )
    );

    // now do the same for Commas
    const getAveragePercentage_Commas = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT AVG(Percentage) AS AveragePercentage, COUNT(Percentage) AS NumberOfGames FROM GameData WHERE Email=? AND GameName=?',
                    [email, 'Commas'],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(results.rows.item(0));
                        } else {
                            resolve(false);
                        }
                    },
                    error => {
                        reject(error);
                    }
                );
            });
        }
        );
    }

    const updateData_Commas = async () => {
        try {
            const result = await getAveragePercentage_Commas();
            if (result) {
                setCommasData({
                    averagePercentage: Math.round(result.AveragePercentage),
                    numberOfGames: Math.round(result.NumberOfGames)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateData_Commas();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const intervalId = setInterval(updateData_Commas, 5000);
            return () => clearInterval(intervalId);
        }
        )
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await updateData();
        await updateData_Averages();
        await updateData_Conversions();
        await updateData_Divisions();
        await updateData_Details();
        await updateData_Commas();
        setRefreshing(false);
    };


    return (
        <SafeAreaView
            style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#000000', width: '100%' }}>
                <Text style={{ fontSize: 25, lineHeight: 60, textAlign: 'center', marginLeft: 0, marginTop: 0, fontWeight: 'bold', color: '#ffffff' }}>
                    Performance
                </Text>
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    alignItems: 'center',
                    marginTop: 30
                }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 5, marginBottom: 20 }}>Percentage</Text>
                    <CircularProgress
                        percentage={data.averagePercentage}
                        donutColor="#FF6347"
                        donutStrokeWidth={20}
                        donutStrokeColor="#FF6347"
                        fillColor="#f0f0f0"
                        blankColor='#ffffff'

                        size={90}
                        children={
                            <Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>
                                {data.averagePercentage}%
                            </Text>
                        }
                    />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20 }}>
                        Games Played: {data.numberOfGames}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 5, marginBottom: 20 }}>Average</Text>
                    <CircularProgress
                        percentage={averageData.averagePercentage}
                        donutColor="#FF6347"
                        donutStrokeWidth={20}
                        donutStrokeColor="#FF6347"
                        fillColor="#f0f0f0"
                        blankColor='#ffffff'

                        size={90}
                        children={
                            <Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>
                                {averageData.averagePercentage}%
                            </Text>
                        }
                    />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20 }}>
                        Games Played: {averageData.numberOfGames}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 5, marginBottom: 20 }}>Conversion</Text>
                    <CircularProgress
                        percentage={conversionData
                            .averagePercentage}
                        donutColor="#FF6347"
                        donutStrokeWidth={20}
                        donutStrokeColor="#FF6347"
                        fillColor="#f0f0f0"
                        blankColor='#ffffff'

                        size={90}
                        children={
                            <Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>
                                {conversionData
                                    .averagePercentage}%
                            </Text>
                        }
                    />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20 }}>
                        Games Played: {conversionData.numberOfGames}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 10
                }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 5, marginBottom: 20 }}>Division</Text>
                    <CircularProgress
                        percentage={divisionData
                            .averagePercentage}
                        donutColor="#FF6347"
                        donutStrokeWidth={20}
                        donutStrokeColor="#FF6347"
                        fillColor="#f0f0f0"
                        blankColor='#ffffff'

                        size={90}
                        children={
                            <Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>
                                {divisionData
                                    .averagePercentage}%
                            </Text>
                        }
                    />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20 }}>
                        Games Played: {divisionData.numberOfGames}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 5, marginBottom: 10 }}>Details</Text>
                    <CircularProgress
                        percentage={detailsData
                            .averagePercentage}
                        donutColor="#FF6347"
                        donutStrokeWidth={20}
                        donutStrokeColor="#FF6347"
                        fillColor="#f0f0f0"
                        blankColor='#ffffff'

                        size={90}
                        children={
                            <Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>
                                {detailsData
                                    .averagePercentage}%
                            </Text>
                        }
                    />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20 }}>
                        Games Played: {detailsData.numberOfGames}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    padding: 20,
                    width: '90%',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 30
                }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 5, marginBottom: 20 }}>Commas</Text>
                    <CircularProgress
                        percentage={commasData
                            .averagePercentage}
                        donutColor="#FF6347"
                        donutStrokeWidth={20}
                        donutStrokeColor="#FF6347"
                        fillColor="#f0f0f0"
                        blankColor='#ffffff'

                        size={90}
                        children={
                            <Text style={{ fontSize: 21, color: 'black', fontWeight: 'bold' }}>
                                {commasData
                                    .averagePercentage}%
                            </Text>
                        }
                    />
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 20 }}>
                        Games Played: {commasData.numberOfGames}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}