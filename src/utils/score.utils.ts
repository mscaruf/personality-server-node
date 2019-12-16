import { Subject } from "../models/subject.model";
import { Disorder } from "../models/disorder.model";
import { ScoreInterface } from "../interfaces/score";

const getSubjectScore = (subject: Subject, disorders: Disorder[]): ScoreInterface => {
    const score: ScoreInterface = {};

    for (const d of disorders) {
        for (const tag of subject.tags) {
            if (d.tags.includes(tag)) {
                if (!score[d.shortname]) {
                    score[d.shortname] = 0;
                }

                score[d.shortname] += 1;
            }
        }
    }

    return score;
};

export {
    getSubjectScore
};
