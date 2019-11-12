import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, Button } from 'react-native';

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { active: 'today' };
    }
    componentWillUpdate
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Home Screen</Text>
              <Button
                title="Go to Details"
                onPress={() => {
                  this.props.navigation.navigate('Details', {
                    itemId: 86,
                    otherParam: 'anything you want here',
                  });
                }}
              />
            </View>
        )
    }
}
Home.propTypes = propTypes;

export default Home;