import { makeStyles } from '@material-ui/core';
import React from 'react';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TaskInput from '../TaskInput/TaskInput';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./CategoryStyles";
import { actions, 
    deleteCategory,
    updateCategoryText,
    updateEditCategoryText
 } from '../../redux/actions';
import { getChangedCategoryText, selectDefaultCategoryID } from '../../redux/selectors/selectors';

const Category = ({category, setEdit, setEditCategoryId, 
                editCategoryId, setButton, setChoosesIcon}) => {

    const {color, icon, name, isEdit, id} = category;

    const useStylesSpan = makeStyles({
        CategoryIcon: {
            color: color
        }
    });

    const iconClasses = useStylesSpan();
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryId = useSelector(selectDefaultCategoryID);
    const changedCategoryText = useSelector(getChangedCategoryText);

    const updateCategoryParams = {
        name: changedCategoryText,
        id: id
    };

    const deleteChoosedCategory = () => {
        dispatch(deleteCategory(id));
        setEditCategoryId(id);
    };

    const inputTextChanger = (event) => {
        const { value } = event.target;
        const text = value;
        dispatch(actions.updateEditCategoryText(text));
    };

    const editHandleEnter = (event, updateCategoryParams) => {
        if (event.key === 'Enter') {
            dispatch(updateCategoryText(updateCategoryParams));
        }
    };

    const enterHandler = (event) => {
        changedCategoryText.length > 0 
        ? editHandleEnter(event, updateCategoryParams) : null;
    }

    const changeCategoryHandler = () => {
        dispatch(actions.changeCategoryHandler(id));
    };

    return (
        <div className={classes.CategoryPageContainer}>
            <div className={classes.CategoryPageRow}>
                <div className={classes.CategoryParams}>
                    <Button
                            onClick={() => {
                                setEdit(true)
                                setEditCategoryId(id)
                                setButton(color)
                                setChoosesIcon(icon)
                            }}
                        >
                        <span className={`${iconClasses.CategoryIcon} material-icons`}>
             {icon}
            </span>
                        </Button>
                    {isEdit
                        ?
                        <TaskInput
                            value={changedCategoryText}
                            onChange={inputTextChanger}
                            onKeyPress={enterHandler}
                            /* error={maxLength(ChangedCategoryText)} */
                            placeholder='edit category'
                        />
                        : (<span onClick={changeCategoryHandler} className={classes.categoryTitleWithEdit}>{name}</span>)
                    }
                </div>
                <div>
                    {categoryId !== id && (<IconButton aria-label="Delete"
                                       onClick={deleteChoosedCategory}
                                       disabled={editCategoryId === id}
                        >
                            <ClearIcon color={'secondary'}/>
                        </IconButton>)
                        }
                </div>
            </div>
        </div>

    )
}

export default Category;