import React, { ChangeEvent, forwardRef, LegacyRef } from 'react';
import { Paper, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actions, deleteTask, updateTask } from '../redux/actions';
import { getChangedTaskText } from '../redux/selectors/selectors';
import Checkbox from '@material-ui/core/Checkbox';
import { StyledButton } from './TaskButton';
import { CategoryType } from '../types/types';
import { useStyles } from './TaskItem.styles';

export type TaskType = {
  title: string;
  isDone: boolean;
  isEdit: boolean;
  id: number;
  isFavorite: boolean;
  categoryId: number;
  date: number;
};

export type PropsType = {
  task: TaskType;
  categories: CategoryType[];
  isListDone: boolean;
  setEnd: (end: number) => void;
  end: number;
};

const TaskItem: React.FC<PropsType> = forwardRef(
  (
    { task, categories, isListDone, setEnd, end },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const changedTaskText = useSelector(getChangedTaskText);

    const updateTextParams = {
      title: changedTaskText,
      id: task.id,
    };

    const editHandleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        dispatch(
          updateTask({
            isFavorite: task.isFavorite,
            id: task.id,
            isDone: task.isDone,
            title: changedTaskText,
            isListDone: isListDone,
          })
        );
        dispatch(actions.editTaskText(updateTextParams));
      }
    };

    const updateTaskFavorite = () => {
      dispatch(
        updateTask({
          isFavorite: !task.isFavorite,
          id: task.id,
          isDone: task.isDone,
          title: task.title,
          isListDone: isListDone,
        })
      );
      dispatch(actions.changeFavoriteStatus(task.id));
    };

    const inputTextChanger = (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const { value } = event.target;
      const text = value;
      dispatch(actions.updateEditTaskText(text));
    };

    const updateCategoryHandler = () => {
      dispatch(
        updateTask({
          isFavorite: task.isFavorite,
          title: task.title,
          isDone: !task.isDone,
          id: task.id,
          isListDone: isListDone,
        })
      );
      dispatch(actions.changeTaskStatus(task.id, isListDone));
    };

    const changeTaskHandler = () => {
      dispatch(actions.changeHandler(task.id));
    };

    const deleteChosenTask = () => {
      dispatch(deleteTask(task.id));
      setEnd(end - 1);
    };

    const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) =>
      changedTaskText.length ? editHandleEnter(event) : null;
    return (
      <div ref={ref}>
        <Paper elevation={2} className={classes.Paper}>
          <div style={{ padding: '9px' }}>{`${new Date(
            task.date
          ).toLocaleDateString()}`}</div>
          <Checkbox onClick={updateCategoryHandler} checked={task.isDone} />
          <div style={{ padding: '10px' }}>
            {categories.map((category) => {
              if (category.id === task.categoryId) {
                return (
                  <span
                    key={task.categoryId}
                    className="material-icons"
                    style={{
                      color: category.color,
                      verticalAlign: 'middle',
                      margin: 5,
                    }}
                  >
                    {category.icon}
                  </span>
                );
              }
            })}
          </div>

          {task.isEdit ? (
            <TextField
              value={changedTaskText}
              onChange={inputTextChanger}
              key={task.id + 1}
              onKeyPress={enterHandler}
            />
          ) : (
            <span onClick={changeTaskHandler}>{task.title}</span>
          )}
          <div className={classes.taskButtons}>
            {!isListDone ? (
              <StyledButton
                className="material-icons"
                onClick={updateTaskFavorite}
              >
                {task.isFavorite ? 'star' : 'star_border'}
              </StyledButton>
            ) : null}

            <IconButton
              color="secondary"
              aria-label="Delete"
              onClick={deleteChosenTask}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </Paper>
      </div>
    );
  }
);

export default TaskItem;
