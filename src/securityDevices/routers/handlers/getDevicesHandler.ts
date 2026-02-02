import {Response} from "express";

import {HttpStatus} from "../../../core/types/http-ststuses";
import {errorsHandler} from "../../../core/errors/errors.handler";
import {sessionsRepository} from "../../repositories/sessions.repository";
import {RequestWithUserId} from "../../../core/types/requests";
import {IdType} from "../../../core/types/id";
import {mapToSessionOutputUtil} from "../mappers/map-to-session-output.util";

export async function getDevicesHandler(
    req: RequestWithUserId<IdType>,
    res: Response
) {
    try {
        const userId = req.user?.id as string;
        const results = await sessionsRepository.findMany(userId);
        if (!results) return res.status(HttpStatus.Ok).send([]);

        console.log("getDevicesHandler", results);
        const sessionsListOutput = mapToSessionOutputUtil(results);

        res.status(HttpStatus.Ok).send(sessionsListOutput?.length > 0 ? sessionsListOutput : []);
    } catch (e) {
        errorsHandler(e, res);
    }
}
