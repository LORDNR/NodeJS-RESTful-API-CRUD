const express = require('express')
const router = express.Router()

//prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//GET read
router.get('/', async (req, res) => {
    const animes = await prisma.anime.findMany()

    if (animes.length == 0) {
        msg = 'Anime table is empty'
    } else {
        msg = 'Successfully retrieved all Anime'
    }

    res.send({
        err: false,
        data: animes,
        msg: msg,
    })
})

//GET by id || read 1

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const anime = await prisma.anime.findUnique({
        where: {
            id: id,
        },
    })

    if (anime === null) {
        msg = 'Anime table is empty'
    } else {
        msg = 'Successfully retrieved Anime data'
    }

    res.send({
        err: false,
        data: anime,
        msg: msg,
    })
})

//POST Insert
router.post('/', async (req, res) => {
    const { name, author } = req.body

    //validation
    if (!name || !author) {
        return res
            .status(400)
            .send({ err: true, msg: 'Please provide anime name and author' })
    }
    const anime = await prisma.anime.create({
        data: {
            name: name,
            author: author,
        },
    })
    res.send({ err: false, data: anime, msg: 'Anime Successfully added' })
})

//Put Update
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const { name, author } = req.body

    //validation
    if (!id || !name || !author) {
        return res
            .status(400)
            .send({
                err: true,
                msg: 'Please provide anime id, name and author',
            })
    }
    const anime = await prisma.anime.update({
        where: { id: id },
        data: { name: name, author: author },
    })
    res.send({ err: false, data: anime, msg: 'Anime Successfully Updated' })
})

//Delete by id
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!id) {
        return res
            .status(400)
            .send({ err: true, msg: 'Please provide anime id' })
    }

    const anime = await prisma.anime.delete({
        where: { id: id },
    })

    res.status(204).end()
})

module.exports = router
