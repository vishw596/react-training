import { memo } from "react";

type TodoCardProps = {
    id:string;
    title: string;
    isCompleted: boolean;
    handleTodoCompletion: (checked: boolean, id: string) => void;
};
function TodoCard({ id,title, isCompleted, handleTodoCompletion }: TodoCardProps) {
    console.log(id,title);
    
    return (
        <>
            <div style={{ display: "flex", gap:"12px"}}>
                <p style={isCompleted ? { textDecorationLine: "line-through" } : {}}>Title:{title}</p>
                <input
                    id={id}
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => {
                        const {checked,id} = e.target
                        handleTodoCompletion(checked,id);
                    }}
                />
            </div>
        </>
    );
}
export default memo(TodoCard)