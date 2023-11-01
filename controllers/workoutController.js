const router = require('express').Router()
const workoutService = require('../services/workoutService.js')
const exerciseService = require('../services/exerciseService.js')
const {getErrorMessage} = require('../utils/errorMsg.js')

router.get('/', async (req,res) => {
    try {
        const result = await workoutService.getAll()
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})



router.post('/addWorkout',async (req,res) => {
const {workoutName} = req.body;
try {
    const result = await workoutService.createWorkout(workoutName)
    res.status(201).json(result)
} catch (err) {
    res.status(400).json({message: getErrorMessage(err)})
}
})


router.get('/:workoutId', async (req,res) => {
    const workoutId = req.params.workoutId;
    try {
        const result = await workoutService.getOne(workoutId)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.get('/:workoutId/filteredExercises', async (req,res) => {
  const workoutId = req.params.workoutId;
  let { muscleGroup } = req.query;
  try {
    const result = await exerciseService.filterByMuscleGroup(muscleGroup)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({message: getErrorMessage(err)})
  }

})

router.post('/:workoutId/addExercise',async (req,res) => {
  const workoutId = req.params.workoutId
  const {nameOfExercise,nameOfMuscleGroup,setNumber,reps,weight,restTime} = req.body;
  const exerciseDetails = {nameOfExercise,nameOfMuscleGroup}
  const setDetails = {setNumber,reps,weight,restTime}
  try {
      const result = await workoutService.addExerciseToWorkout(workoutId,exerciseDetails,setDetails)
      res.status(201).json(result)
  } catch (err) {
      res.status(400).json({message: getErrorMessage(err)})
  }
  })

router.delete('/:workoutId', async (req,res) => {
    const workoutId = req.params.workoutId;
    try {
        const result = await workoutService.deleteWorkout(workoutId)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})

router.put('/:workoutId', async (req,res) => {
    const workoutId = req.params.workoutId;
    const {newWorkoutName} = req.body;
    try {
        const result = await workoutService.editWorkoutName(workoutId,newWorkoutName)
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({message: getErrorMessage(err)})
    }
})



router.delete('/:workoutId/exercises/:exerciseId', async (req, res) => {
    const { workoutId, exerciseId } = req.params;
    try {
      const result = await workoutService.deleteExercise(workoutId, exerciseId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: getErrorMessage(err) });
    }
  });

  

router.delete('/:workoutId/exercises/:exerciseId/sets/:setId', async (req, res) => {
    const { workoutId, exerciseId, setId } = req.params;
    try {
      const result = await workoutService.deleteSet(workoutId, exerciseId, setId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: getErrorMessage(err) });
    }
  });

  

module.exports = router;