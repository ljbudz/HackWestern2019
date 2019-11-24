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
        backgroundColor: '#9042D0',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
});

class NavigationBar extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            labelLeft,
            onClickLeft,

            labelCenter,
            onClickCenter,

            labelRight,
            onClickRight,

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
                <View style={[styles.navigationBar, navigationBarStyle]}>
                    <Button
                        title={labelLeft}
                        color="#B55BD7"
                        onPress={() => {
                            console.log("click left");
                        }}
                    />
                    <Button
                        title={labelCenter}
                        color="#B55BD7"
                        onPress={this.props.onClickCenter}
                    />
                    <Button
                        title={labelRight}
                        color="#B55BD7"
                        onPress={this.props.onClickRight}
                    />
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
        backgroundColor: '#9042D0',
    },
    componentLeft: <View style={{ flex: 1 }}/>,
    componentCenter: <View style={{ flex: 1 }}/>,
    componentRight: <View style={{ flex: 1 }}/>
};

export default NavigationBar;