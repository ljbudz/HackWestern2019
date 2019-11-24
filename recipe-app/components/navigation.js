import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, Button, StatusBar } from "react-native";

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const appBarHeight = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "blue"
    },
    statusBar: {
        height: statusBarHeight,
    },
    navigationBar: {
        flexDirection: 'row',
        height: appBarHeight,
        backgroundColor: 'pink',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        padding: 5
    },
});

class NavigationBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            componentLeft,
            componentCenter,
            componentRight,

            barStyle,
            backgroundColor,
            navigationBarStyle,
        } = this.props;

        return (<View style={styles.container}>
            <View style={[styles.statusBar, backgroundColor]}>
                <StatusBar
                    barStyle={barStyle}
                    backgroundColor={backgroundColor}
                />
                <View style={[styles.navigationBar, navigationBarStyle,]}>
                {componentLeft}
                {componentCenter}
                {componentRight}
                </View>
            </View>
        </View>);
    }
}


NavigationBar.defaultProps = {
    statusBarStyle: {
        barStyle: 'light-content',
        backgroundColor: '#215e79',
    },
    navigationBarStyle: {
        backgroundColor: 'pink',
    },
    componentLeft: <View style={{ flex: 1 }}/>,
    componentCenter: <View style={{ flex: 1 }}/>,
    componentRight: <View style={{ flex: 1 }}/>
};

//exports.default = NavigationBar;

export default NavigationBar;