'use strict'

const router = require('express').Router()
const { User, Company, Project } = require('../db/models')
module.exports = router

const userRoute = require('./users');
const projectRoute = require('./projectRoute');
const companyRoute = require('./companyRoute')

router.post('/', (req, res, next) => {
  return Project.create(req.body)
    .then(project => res.json(project))
    .catch(next);
});


router.get('/all', (req, res, next) => {
  Project.findAll()
    .then(projects => res.json(projects))
    .catch(next);
});


router.get('/in-process/:id', (req, res, next) => {
  let id = +req.params.id
  Project.findAll({
    where: {
      userId: id,
      status: 'In Process'
    }
  })
    .then(projects => res.json(projects))
    .catch(next);
})

router.get('/complete/:id', (req,res,next) => {
  let id = +req.params.id;
  Project.findAll({
    where: {
      userId: id,
      status: 'Complete'
    }
  })
  .then(projects => res.json(projects))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = +req.params.id;
  Project.findAll({
    where: {
      userId: id
    }
  })
  .then(projects => res.json(projects))
  .catch(next)
})

router.put('/:projectId', (req, res, next) => {
  return Project.update(req.body, {
    where: {
      projectId: req.params.projectId
    },
    returning: true,
    plain: true
  })
  .then(project => res.json(project))
  // .then(([numRows, updatedRows]) => {
  //   res.json(updatedRows[0]);
  // })
  .catch(next);
});

// router.get('/:id/orders', async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       where: {
//         status: 'Completed',
//         userId: +req.params.id
//       },
//       include: [{
//         model: OrderItem
//       }]
//     })
//     res.json(orders)
//   }
//   catch (error) {
//     next(error)
//   }
// })


//GET a project by projectId
// router.get('/:id', async (req, res, next) => {
//   console.log("PROJECT ID: ", req.params.id)
//   const project = await Project.findOne({where: {projectId: +req.params.id}})
//   const user = await project.addUser(+req.params.id)
//   .then(user => res.json(user))
//   .catch(next);
// });


router.put('/:projectId', (req, res, next) => {
  return Project.update(req.body, {
    where: { projectId: req.params.projectId },
    returning: true,
    plain: true
  })
    .then(([numRows, updatedRows]) => {
      res.json(updatedRows[0]);
    })
    .catch(next);
});

module.exports = router;

