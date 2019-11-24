import React, { Component } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { db } from "../config";
import { getRecipes } from "../recipeRequest";

export default class RecipeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [], ingredients: [], dataFetched: false };
    }

    componentDidMount() {
        let Ingredientlist = [];
        db.ref("/ingredients")
            .once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    Ingredientlist.push(childSnapshot.val().name);
                });
            })
            .then(() => {
                getRecipes(Ingredientlist).then(recipes => {
                    this.setState(
                        Object.assign(this.state, {
                            ingredients: Ingredientlist,
                            recipes: recipes,
                            dataFetched: true
                        })
                    );
                });
            });
    }

    parseRecipeText(recipe) {
        let str = ["", ""];

        if (recipe.usedIngredientCount !== 0) {
            let used = "";
            recipe.usedIngredients.forEach(function(ingredient) {
                used += "- " + ingredient.originalString + "\n";
            });
            str[0] = "" + used;
        }

        if (recipe.missedIngredientCount !== 0) {
            let missed = "";
            recipe.missedIngredients.forEach(function(ingredient) {
                missed += "- " + ingredient.originalString + "\n";
            });
            str[1] = missed;
        }

        return str;
    }

    render() {
        if (this.state.dataFetched) {
            return (
                <ScrollView>
                    {this.state.recipes.map((recipe, i) => {
                        return (
                            <Card title={recipe.title} style={{fontSize: 25}} key={i}>
                                <View style={style.viewContainer}>
                                    <Image
                                        style={style.images}
                                        source={{ uri: recipe.image }}
                                    />
                                    <Text style={style.cardText}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"Used Ingredients: " +
                                                recipe.usedIngredientCount +
                                                "\n"}
                                        </Text>
                                        {this.parseRecipeText(recipe)[0]}
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\nMissing Ingredients: " +
                                                recipe.missedIngredientCount +
                                                "\n"}
                                        </Text>
                                        {this.parseRecipeText(recipe)[1]}
                                    </Text>
                                </View>
                            </Card>
                        );
                    })}
                </ScrollView>
            );
        } else {
            return (
                <View>
                    <Button type="clear" loading={true} />
                </View>
            );
        }
    }
}

const style = StyleSheet.create({
    cardText: {
        fontSize: 14,
        textAlign: "left",
        flex: 1
    },
    images: {
        height: 150,
        width: 150,
        marginRight: 15,
        flex: 1
    },
    viewContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "flex-start"
    }
});
