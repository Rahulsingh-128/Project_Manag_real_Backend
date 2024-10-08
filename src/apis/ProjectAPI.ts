import Project, {IProject} from "../model/Project";
interface IAddProject {
    _id: number;
    project_name: string;
    details: string;
    demo_link: string;
    github_repository: string;
}

async function addProject(project: IAddProject): Promise<IProject | null> {
    console.log("project", project);
    try {
        const projectDoc = new Project(project);
        return await projectDoc.save();
    } catch (error) {
        console.error("Error adding project:", error);
        return null; // Return null in case of error
    }
}

async function getAllProjects():Promise<IProject[]> {
    return await Project.find({}).exec();
}

async function getProjectById(_id:number):Promise<IProject | null>{
    return await Project.findById(_id).exec();
}

async function updateProject(_id: number, project:IProject):Promise<any>{
    const filter= {_id: _id};
    const {_id:removeId, ...updates}=project;
    const result = await Project.updateOne(filter, updates);
    return result;
}

async function deleteProjectById(_id: number){
    return await Project.deleteOne({_id: _id});
}

export  {addProject, getAllProjects, getProjectById, updateProject, deleteProjectById};
