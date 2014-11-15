var List = React.createClass({
    displayName: 'List',

    getInitialState: function() {
        return {focused: 0};
    },

    render: function() {
        var self = this;

        return React.createElement("ul", null, 
    
                this.props.items.map(function(m, index) {
                    var style = '';

                    if (self.state.focused == index) {
                        style = 'focused';
                    }

                    var attr = {name: 'value'};

                    return React.createElement(Item, React.__spread({},  attr, {title: "Item", className: 'item ' + style}), m);
                })
            
    
);
    }
});