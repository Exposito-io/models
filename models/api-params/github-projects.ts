import { interface as Interface, string, union, Integer, array } from 'io-ts'


/**
 * PeriodicTransfer recipient: One or many Github projects.
 * If added as a PeriodicTransfer recipient, Exposito
 * will calculate how much of the initial amount will
 * go to each programmers of the project(s), deprending
 * on the line calculation algorithm chosen.
 */
export class GithubProjects {

    /** Github projects paths. E.g. ['exposito-io/dummy-web-project'] */
    githubProjects: string[]

    /** Line calculation algorithm */
    lineCalculation?: LineCalculationType = LineCalculationType.CurrentLines

    constructor(params: GithubProjects) {
        this.githubProjects = params.githubProjects
        this.lineCalculation = params.lineCalculation || LineCalculationType.CurrentLines
    }

    static runtimeType() {
        return Interface({
            githubProjects: array(string),
            lineCalculation: union([ string, undefined ])
        })
    }
}


export enum LineCalculationType {
    Unknown = 0,
    CurrentLines = 1
}