export class GithubProjects {
    githubProjects: string[]
    lineCalculation?: LineCalculationType = LineCalculationType.CurrentLines

    constructor(params: GithubProjects) {
        this.githubProjects = params.githubProjects
        this.lineCalculation = params.lineCalculation || LineCalculationType.CurrentLines
    }

    static validate(json: any) {
        // TODO
    }
}


export enum LineCalculationType {
    Unknown = 0,
    CurrentLines = 1
}