var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import HTML5Backend from 'react-dnd-html5-backend';
const ItemTypes = {
    CARD: 'card',
};
const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};
const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        props.moveCard(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};
let Card = class Card extends React.Component {
    render() {
        const { 
        //text,
        id, isDragging, connectDragSource, connectDropTarget, } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(<div style={{ opacity }} key={id}>{this.props.children}</div>));
    }
};
Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    //text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
};
Card = __decorate([
    DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    })),
    DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))
], Card);
export { Card };
let Dragdata = class Dragdata extends React.Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {
            cards: props.dataSource ? props.dataSource : []
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource != this.props.dataSource) {
            this.setState({ cards: nextProps.dataSource });
        }
    }
    moveCard(dragIndex, hoverIndex) {
        let cards = this.state.cards;
        let dragCard;
        if (cards && cards[dragIndex]) {
            dragCard = cards[dragIndex];
        }
        this.setState(update(this.state, {
            cards: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            },
        }), () => {
            let cardsdata = this.state.cards;
            if (this.props.getChangeSource) {
                this.props.getChangeSource(cardsdata);
            }
        });
    }
    render() {
        let cardsdata = this.state.cards;
        return (<div>
        {cardsdata && cardsdata.length && cardsdata.map((list, i) => (<Card key={list.id} index={i} id={list.id} moveCard={this.moveCard}>{list.showtext}</Card>))}
      </div>);
    }
};
Dragdata = __decorate([
    DragDropContext(HTML5Backend)
], Dragdata);
export default Dragdata;
