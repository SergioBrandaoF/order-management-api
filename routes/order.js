const express = require('express');
const router = express.Router();
const Order = require('../models/order')

// Criar nova order
router.post('/', async (req, res) => {
    try {
        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

        const transformedItems = items.map(item => ({
            productId: parseInt(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem,
        }));

        const newOrder = new Order({
            orderId: numeroPedido,
            value: valorTotal,
            creationDate: new Date(dataCriacao),
            items: transformedItems,
        });

        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send({ message: 'Erro na criação da order', error });
    }
});

// Receber order por orderId
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).send({ message: 'Order não encontrada' });
        res.send(order);
    } catch (error) {
        res.status(500).send({ message: 'Erro em reaver order', error });
    }
});

// Listar todas as orders
router.get('/list', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (error) {
        res.status(500).send({ message: 'Erro listando orders', error });
    }
});

// Atualizar order por orderId
router.put('/:orderId', async (req, res) => {
    try {
        const { valorTotal, dataCriacao, items } = req.body;

        const transformedItems = items.map(item => ({
            productId: parseInt(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem,
        }));

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            { 
                value: valorTotal,
                creationDate: new Date(dataCriacao),
                items: transformedItems,
             },
             { new: true }
        );

        if (!updatedOrder) return res.status(404).send({ message: 'Order não encontrada' });
        res.send(updatedOrder);
    } catch (error) {
        res.status(500).send({ message: 'Erro na atualização da order', error });
    }
});

// Deletar order por orderId
router.delete('/:orderId', async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });
        if (!deletedOrder) return res.status(404).send({ message: 'Order não encontrada' });
        res.send({ message: 'Order deletada' });
    } catch (error) {
        console.error('Erro deletando order', error);
        res.status(500).send({ message: 'Erro deletando order', error });
    }
});

module.exports = router;
