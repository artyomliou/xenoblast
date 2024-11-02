/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const common = $root.common = (() => {

    /**
     * Namespace common.
     * @exports common
     * @namespace
     */
    const common = {};

    /**
     * GameState enum.
     * @name common.GameState
     * @enum {number}
     * @property {number} Init=0 Init value
     * @property {number} Preparing=1 Preparing value
     * @property {number} Prepared=2 Prepared value
     * @property {number} WaitingReady=3 WaitingReady value
     * @property {number} Countdown=4 Countdown value
     * @property {number} Playing=5 Playing value
     * @property {number} Gameover=6 Gameover value
     * @property {number} Crash=7 Crash value
     */
    common.GameState = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Init"] = 0;
        values[valuesById[1] = "Preparing"] = 1;
        values[valuesById[2] = "Prepared"] = 2;
        values[valuesById[3] = "WaitingReady"] = 3;
        values[valuesById[4] = "Countdown"] = 4;
        values[valuesById[5] = "Playing"] = 5;
        values[valuesById[6] = "Gameover"] = 6;
        values[valuesById[7] = "Crash"] = 7;
        return values;
    })();

    /**
     * EventType enum.
     * @name common.EventType
     * @enum {number}
     * @property {number} SessionRun=0 SessionRun value
     * @property {number} SubscribeNewMatch=1 SubscribeNewMatch value
     * @property {number} NewMatch=2 NewMatch value
     * @property {number} StatePreparing=3 StatePreparing value
     * @property {number} StatePrepared=4 StatePrepared value
     * @property {number} StateWaitingReady=5 StateWaitingReady value
     * @property {number} StateCountdown=6 StateCountdown value
     * @property {number} StatePlaying=7 StatePlaying value
     * @property {number} StateGameover=8 StateGameover value
     * @property {number} StateCrash=9 StateCrash value
     * @property {number} WinConditionSatisfied=10 WinConditionSatisfied value
     * @property {number} PlayerReady=21 PlayerReady value
     * @property {number} PlayerMove=22 PlayerMove value
     * @property {number} PlayerGetPowerup=23 PlayerGetPowerup value
     * @property {number} PlayerPlantBomb=24 PlayerPlantBomb value
     * @property {number} PlayerMoved=31 PlayerMoved value
     * @property {number} PlayerDead=32 PlayerDead value
     * @property {number} BombPlanted=33 BombPlanted value
     * @property {number} BombWillExplode=34 BombWillExplode value
     * @property {number} BombExploded=35 BombExploded value
     * @property {number} BoxRemoved=36 BoxRemoved value
     * @property {number} PowerupDropped=37 PowerupDropped value
     * @property {number} PowerupConsumed=38 PowerupConsumed value
     */
    common.EventType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SessionRun"] = 0;
        values[valuesById[1] = "SubscribeNewMatch"] = 1;
        values[valuesById[2] = "NewMatch"] = 2;
        values[valuesById[3] = "StatePreparing"] = 3;
        values[valuesById[4] = "StatePrepared"] = 4;
        values[valuesById[5] = "StateWaitingReady"] = 5;
        values[valuesById[6] = "StateCountdown"] = 6;
        values[valuesById[7] = "StatePlaying"] = 7;
        values[valuesById[8] = "StateGameover"] = 8;
        values[valuesById[9] = "StateCrash"] = 9;
        values[valuesById[10] = "WinConditionSatisfied"] = 10;
        values[valuesById[21] = "PlayerReady"] = 21;
        values[valuesById[22] = "PlayerMove"] = 22;
        values[valuesById[23] = "PlayerGetPowerup"] = 23;
        values[valuesById[24] = "PlayerPlantBomb"] = 24;
        values[valuesById[31] = "PlayerMoved"] = 31;
        values[valuesById[32] = "PlayerDead"] = 32;
        values[valuesById[33] = "BombPlanted"] = 33;
        values[valuesById[34] = "BombWillExplode"] = 34;
        values[valuesById[35] = "BombExploded"] = 35;
        values[valuesById[36] = "BoxRemoved"] = 36;
        values[valuesById[37] = "PowerupDropped"] = 37;
        values[valuesById[38] = "PowerupConsumed"] = 38;
        return values;
    })();

    common.Event = (function() {

        /**
         * Properties of an Event.
         * @memberof common
         * @interface IEvent
         * @property {common.EventType|null} [type] Event type
         * @property {number|Long|null} [timestamp] Event timestamp
         * @property {number|null} [gameId] Event gameId
         * @property {common.INewMatchData|null} [newMatch] Event newMatch
         * @property {common.ICountdownData|null} [countdown] Event countdown
         * @property {common.IGameOverData|null} [gameOver] Event gameOver
         * @property {common.ICrashData|null} [crash] Event crash
         * @property {common.IPlayerReadyData|null} [playerReady] Event playerReady
         * @property {common.IPlayerMoveData|null} [playerMove] Event playerMove
         * @property {common.IPlayerGetPowerupData|null} [playerGetPowerup] Event playerGetPowerup
         * @property {common.IPlayerPlantBombData|null} [playerPlantBomb] Event playerPlantBomb
         * @property {common.IPlayerMovedData|null} [playerMoved] Event playerMoved
         * @property {common.IPlayerDeadData|null} [playerDead] Event playerDead
         * @property {common.IBombPlantedData|null} [bombPlanted] Event bombPlanted
         * @property {common.IBombWillExplodeData|null} [bombWillExplode] Event bombWillExplode
         * @property {common.IBombExplodedData|null} [bombExploded] Event bombExploded
         * @property {common.IBoxRemovedData|null} [boxRemoved] Event boxRemoved
         * @property {common.IPowerupDroppedData|null} [powerupDropped] Event powerupDropped
         * @property {common.IPowerupConsumedData|null} [powerupConsumed] Event powerupConsumed
         */

        /**
         * Constructs a new Event.
         * @memberof common
         * @classdesc Represents an Event.
         * @implements IEvent
         * @constructor
         * @param {common.IEvent=} [properties] Properties to set
         */
        function Event(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Event type.
         * @member {common.EventType} type
         * @memberof common.Event
         * @instance
         */
        Event.prototype.type = 0;

        /**
         * Event timestamp.
         * @member {number|Long} timestamp
         * @memberof common.Event
         * @instance
         */
        Event.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Event gameId.
         * @member {number} gameId
         * @memberof common.Event
         * @instance
         */
        Event.prototype.gameId = 0;

        /**
         * Event newMatch.
         * @member {common.INewMatchData|null|undefined} newMatch
         * @memberof common.Event
         * @instance
         */
        Event.prototype.newMatch = null;

        /**
         * Event countdown.
         * @member {common.ICountdownData|null|undefined} countdown
         * @memberof common.Event
         * @instance
         */
        Event.prototype.countdown = null;

        /**
         * Event gameOver.
         * @member {common.IGameOverData|null|undefined} gameOver
         * @memberof common.Event
         * @instance
         */
        Event.prototype.gameOver = null;

        /**
         * Event crash.
         * @member {common.ICrashData|null|undefined} crash
         * @memberof common.Event
         * @instance
         */
        Event.prototype.crash = null;

        /**
         * Event playerReady.
         * @member {common.IPlayerReadyData|null|undefined} playerReady
         * @memberof common.Event
         * @instance
         */
        Event.prototype.playerReady = null;

        /**
         * Event playerMove.
         * @member {common.IPlayerMoveData|null|undefined} playerMove
         * @memberof common.Event
         * @instance
         */
        Event.prototype.playerMove = null;

        /**
         * Event playerGetPowerup.
         * @member {common.IPlayerGetPowerupData|null|undefined} playerGetPowerup
         * @memberof common.Event
         * @instance
         */
        Event.prototype.playerGetPowerup = null;

        /**
         * Event playerPlantBomb.
         * @member {common.IPlayerPlantBombData|null|undefined} playerPlantBomb
         * @memberof common.Event
         * @instance
         */
        Event.prototype.playerPlantBomb = null;

        /**
         * Event playerMoved.
         * @member {common.IPlayerMovedData|null|undefined} playerMoved
         * @memberof common.Event
         * @instance
         */
        Event.prototype.playerMoved = null;

        /**
         * Event playerDead.
         * @member {common.IPlayerDeadData|null|undefined} playerDead
         * @memberof common.Event
         * @instance
         */
        Event.prototype.playerDead = null;

        /**
         * Event bombPlanted.
         * @member {common.IBombPlantedData|null|undefined} bombPlanted
         * @memberof common.Event
         * @instance
         */
        Event.prototype.bombPlanted = null;

        /**
         * Event bombWillExplode.
         * @member {common.IBombWillExplodeData|null|undefined} bombWillExplode
         * @memberof common.Event
         * @instance
         */
        Event.prototype.bombWillExplode = null;

        /**
         * Event bombExploded.
         * @member {common.IBombExplodedData|null|undefined} bombExploded
         * @memberof common.Event
         * @instance
         */
        Event.prototype.bombExploded = null;

        /**
         * Event boxRemoved.
         * @member {common.IBoxRemovedData|null|undefined} boxRemoved
         * @memberof common.Event
         * @instance
         */
        Event.prototype.boxRemoved = null;

        /**
         * Event powerupDropped.
         * @member {common.IPowerupDroppedData|null|undefined} powerupDropped
         * @memberof common.Event
         * @instance
         */
        Event.prototype.powerupDropped = null;

        /**
         * Event powerupConsumed.
         * @member {common.IPowerupConsumedData|null|undefined} powerupConsumed
         * @memberof common.Event
         * @instance
         */
        Event.prototype.powerupConsumed = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Event data.
         * @member {"newMatch"|"countdown"|"gameOver"|"crash"|"playerReady"|"playerMove"|"playerGetPowerup"|"playerPlantBomb"|"playerMoved"|"playerDead"|"bombPlanted"|"bombWillExplode"|"bombExploded"|"boxRemoved"|"powerupDropped"|"powerupConsumed"|undefined} data
         * @memberof common.Event
         * @instance
         */
        Object.defineProperty(Event.prototype, "data", {
            get: $util.oneOfGetter($oneOfFields = ["newMatch", "countdown", "gameOver", "crash", "playerReady", "playerMove", "playerGetPowerup", "playerPlantBomb", "playerMoved", "playerDead", "bombPlanted", "bombWillExplode", "bombExploded", "boxRemoved", "powerupDropped", "powerupConsumed"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Event instance using the specified properties.
         * @function create
         * @memberof common.Event
         * @static
         * @param {common.IEvent=} [properties] Properties to set
         * @returns {common.Event} Event instance
         */
        Event.create = function create(properties) {
            return new Event(properties);
        };

        /**
         * Encodes the specified Event message. Does not implicitly {@link common.Event.verify|verify} messages.
         * @function encode
         * @memberof common.Event
         * @static
         * @param {common.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.timestamp);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameId);
            if (message.newMatch != null && Object.hasOwnProperty.call(message, "newMatch"))
                $root.common.NewMatchData.encode(message.newMatch, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.countdown != null && Object.hasOwnProperty.call(message, "countdown"))
                $root.common.CountdownData.encode(message.countdown, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.gameOver != null && Object.hasOwnProperty.call(message, "gameOver"))
                $root.common.GameOverData.encode(message.gameOver, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.crash != null && Object.hasOwnProperty.call(message, "crash"))
                $root.common.CrashData.encode(message.crash, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.playerReady != null && Object.hasOwnProperty.call(message, "playerReady"))
                $root.common.PlayerReadyData.encode(message.playerReady, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.playerMove != null && Object.hasOwnProperty.call(message, "playerMove"))
                $root.common.PlayerMoveData.encode(message.playerMove, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.playerGetPowerup != null && Object.hasOwnProperty.call(message, "playerGetPowerup"))
                $root.common.PlayerGetPowerupData.encode(message.playerGetPowerup, writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
            if (message.playerPlantBomb != null && Object.hasOwnProperty.call(message, "playerPlantBomb"))
                $root.common.PlayerPlantBombData.encode(message.playerPlantBomb, writer.uint32(/* id 24, wireType 2 =*/194).fork()).ldelim();
            if (message.playerMoved != null && Object.hasOwnProperty.call(message, "playerMoved"))
                $root.common.PlayerMovedData.encode(message.playerMoved, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
            if (message.playerDead != null && Object.hasOwnProperty.call(message, "playerDead"))
                $root.common.PlayerDeadData.encode(message.playerDead, writer.uint32(/* id 32, wireType 2 =*/258).fork()).ldelim();
            if (message.bombPlanted != null && Object.hasOwnProperty.call(message, "bombPlanted"))
                $root.common.BombPlantedData.encode(message.bombPlanted, writer.uint32(/* id 33, wireType 2 =*/266).fork()).ldelim();
            if (message.bombWillExplode != null && Object.hasOwnProperty.call(message, "bombWillExplode"))
                $root.common.BombWillExplodeData.encode(message.bombWillExplode, writer.uint32(/* id 34, wireType 2 =*/274).fork()).ldelim();
            if (message.bombExploded != null && Object.hasOwnProperty.call(message, "bombExploded"))
                $root.common.BombExplodedData.encode(message.bombExploded, writer.uint32(/* id 35, wireType 2 =*/282).fork()).ldelim();
            if (message.boxRemoved != null && Object.hasOwnProperty.call(message, "boxRemoved"))
                $root.common.BoxRemovedData.encode(message.boxRemoved, writer.uint32(/* id 36, wireType 2 =*/290).fork()).ldelim();
            if (message.powerupDropped != null && Object.hasOwnProperty.call(message, "powerupDropped"))
                $root.common.PowerupDroppedData.encode(message.powerupDropped, writer.uint32(/* id 37, wireType 2 =*/298).fork()).ldelim();
            if (message.powerupConsumed != null && Object.hasOwnProperty.call(message, "powerupConsumed"))
                $root.common.PowerupConsumedData.encode(message.powerupConsumed, writer.uint32(/* id 38, wireType 2 =*/306).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link common.Event.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Event
         * @static
         * @param {common.IEvent} message Event message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Event.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @function decode
         * @memberof common.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Event();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 3: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 11: {
                        message.newMatch = $root.common.NewMatchData.decode(reader, reader.uint32());
                        break;
                    }
                case 12: {
                        message.countdown = $root.common.CountdownData.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        message.gameOver = $root.common.GameOverData.decode(reader, reader.uint32());
                        break;
                    }
                case 14: {
                        message.crash = $root.common.CrashData.decode(reader, reader.uint32());
                        break;
                    }
                case 21: {
                        message.playerReady = $root.common.PlayerReadyData.decode(reader, reader.uint32());
                        break;
                    }
                case 22: {
                        message.playerMove = $root.common.PlayerMoveData.decode(reader, reader.uint32());
                        break;
                    }
                case 23: {
                        message.playerGetPowerup = $root.common.PlayerGetPowerupData.decode(reader, reader.uint32());
                        break;
                    }
                case 24: {
                        message.playerPlantBomb = $root.common.PlayerPlantBombData.decode(reader, reader.uint32());
                        break;
                    }
                case 31: {
                        message.playerMoved = $root.common.PlayerMovedData.decode(reader, reader.uint32());
                        break;
                    }
                case 32: {
                        message.playerDead = $root.common.PlayerDeadData.decode(reader, reader.uint32());
                        break;
                    }
                case 33: {
                        message.bombPlanted = $root.common.BombPlantedData.decode(reader, reader.uint32());
                        break;
                    }
                case 34: {
                        message.bombWillExplode = $root.common.BombWillExplodeData.decode(reader, reader.uint32());
                        break;
                    }
                case 35: {
                        message.bombExploded = $root.common.BombExplodedData.decode(reader, reader.uint32());
                        break;
                    }
                case 36: {
                        message.boxRemoved = $root.common.BoxRemovedData.decode(reader, reader.uint32());
                        break;
                    }
                case 37: {
                        message.powerupDropped = $root.common.PowerupDroppedData.decode(reader, reader.uint32());
                        break;
                    }
                case 38: {
                        message.powerupConsumed = $root.common.PowerupConsumedData.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Event
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Event} Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Event.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Event message.
         * @function verify
         * @memberof common.Event
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Event.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 21:
                case 22:
                case 23:
                case 24:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 36:
                case 37:
                case 38:
                    break;
                }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.newMatch != null && message.hasOwnProperty("newMatch")) {
                properties.data = 1;
                {
                    let error = $root.common.NewMatchData.verify(message.newMatch);
                    if (error)
                        return "newMatch." + error;
                }
            }
            if (message.countdown != null && message.hasOwnProperty("countdown")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.CountdownData.verify(message.countdown);
                    if (error)
                        return "countdown." + error;
                }
            }
            if (message.gameOver != null && message.hasOwnProperty("gameOver")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.GameOverData.verify(message.gameOver);
                    if (error)
                        return "gameOver." + error;
                }
            }
            if (message.crash != null && message.hasOwnProperty("crash")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.CrashData.verify(message.crash);
                    if (error)
                        return "crash." + error;
                }
            }
            if (message.playerReady != null && message.hasOwnProperty("playerReady")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PlayerReadyData.verify(message.playerReady);
                    if (error)
                        return "playerReady." + error;
                }
            }
            if (message.playerMove != null && message.hasOwnProperty("playerMove")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PlayerMoveData.verify(message.playerMove);
                    if (error)
                        return "playerMove." + error;
                }
            }
            if (message.playerGetPowerup != null && message.hasOwnProperty("playerGetPowerup")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PlayerGetPowerupData.verify(message.playerGetPowerup);
                    if (error)
                        return "playerGetPowerup." + error;
                }
            }
            if (message.playerPlantBomb != null && message.hasOwnProperty("playerPlantBomb")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PlayerPlantBombData.verify(message.playerPlantBomb);
                    if (error)
                        return "playerPlantBomb." + error;
                }
            }
            if (message.playerMoved != null && message.hasOwnProperty("playerMoved")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PlayerMovedData.verify(message.playerMoved);
                    if (error)
                        return "playerMoved." + error;
                }
            }
            if (message.playerDead != null && message.hasOwnProperty("playerDead")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PlayerDeadData.verify(message.playerDead);
                    if (error)
                        return "playerDead." + error;
                }
            }
            if (message.bombPlanted != null && message.hasOwnProperty("bombPlanted")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.BombPlantedData.verify(message.bombPlanted);
                    if (error)
                        return "bombPlanted." + error;
                }
            }
            if (message.bombWillExplode != null && message.hasOwnProperty("bombWillExplode")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.BombWillExplodeData.verify(message.bombWillExplode);
                    if (error)
                        return "bombWillExplode." + error;
                }
            }
            if (message.bombExploded != null && message.hasOwnProperty("bombExploded")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.BombExplodedData.verify(message.bombExploded);
                    if (error)
                        return "bombExploded." + error;
                }
            }
            if (message.boxRemoved != null && message.hasOwnProperty("boxRemoved")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.BoxRemovedData.verify(message.boxRemoved);
                    if (error)
                        return "boxRemoved." + error;
                }
            }
            if (message.powerupDropped != null && message.hasOwnProperty("powerupDropped")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PowerupDroppedData.verify(message.powerupDropped);
                    if (error)
                        return "powerupDropped." + error;
                }
            }
            if (message.powerupConsumed != null && message.hasOwnProperty("powerupConsumed")) {
                if (properties.data === 1)
                    return "data: multiple values";
                properties.data = 1;
                {
                    let error = $root.common.PowerupConsumedData.verify(message.powerupConsumed);
                    if (error)
                        return "powerupConsumed." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Event
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Event} Event
         */
        Event.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Event)
                return object;
            let message = new $root.common.Event();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "SessionRun":
            case 0:
                message.type = 0;
                break;
            case "SubscribeNewMatch":
            case 1:
                message.type = 1;
                break;
            case "NewMatch":
            case 2:
                message.type = 2;
                break;
            case "StatePreparing":
            case 3:
                message.type = 3;
                break;
            case "StatePrepared":
            case 4:
                message.type = 4;
                break;
            case "StateWaitingReady":
            case 5:
                message.type = 5;
                break;
            case "StateCountdown":
            case 6:
                message.type = 6;
                break;
            case "StatePlaying":
            case 7:
                message.type = 7;
                break;
            case "StateGameover":
            case 8:
                message.type = 8;
                break;
            case "StateCrash":
            case 9:
                message.type = 9;
                break;
            case "WinConditionSatisfied":
            case 10:
                message.type = 10;
                break;
            case "PlayerReady":
            case 21:
                message.type = 21;
                break;
            case "PlayerMove":
            case 22:
                message.type = 22;
                break;
            case "PlayerGetPowerup":
            case 23:
                message.type = 23;
                break;
            case "PlayerPlantBomb":
            case 24:
                message.type = 24;
                break;
            case "PlayerMoved":
            case 31:
                message.type = 31;
                break;
            case "PlayerDead":
            case 32:
                message.type = 32;
                break;
            case "BombPlanted":
            case 33:
                message.type = 33;
                break;
            case "BombWillExplode":
            case 34:
                message.type = 34;
                break;
            case "BombExploded":
            case 35:
                message.type = 35;
                break;
            case "BoxRemoved":
            case 36:
                message.type = 36;
                break;
            case "PowerupDropped":
            case 37:
                message.type = 37;
                break;
            case "PowerupConsumed":
            case 38:
                message.type = 38;
                break;
            }
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.newMatch != null) {
                if (typeof object.newMatch !== "object")
                    throw TypeError(".common.Event.newMatch: object expected");
                message.newMatch = $root.common.NewMatchData.fromObject(object.newMatch);
            }
            if (object.countdown != null) {
                if (typeof object.countdown !== "object")
                    throw TypeError(".common.Event.countdown: object expected");
                message.countdown = $root.common.CountdownData.fromObject(object.countdown);
            }
            if (object.gameOver != null) {
                if (typeof object.gameOver !== "object")
                    throw TypeError(".common.Event.gameOver: object expected");
                message.gameOver = $root.common.GameOverData.fromObject(object.gameOver);
            }
            if (object.crash != null) {
                if (typeof object.crash !== "object")
                    throw TypeError(".common.Event.crash: object expected");
                message.crash = $root.common.CrashData.fromObject(object.crash);
            }
            if (object.playerReady != null) {
                if (typeof object.playerReady !== "object")
                    throw TypeError(".common.Event.playerReady: object expected");
                message.playerReady = $root.common.PlayerReadyData.fromObject(object.playerReady);
            }
            if (object.playerMove != null) {
                if (typeof object.playerMove !== "object")
                    throw TypeError(".common.Event.playerMove: object expected");
                message.playerMove = $root.common.PlayerMoveData.fromObject(object.playerMove);
            }
            if (object.playerGetPowerup != null) {
                if (typeof object.playerGetPowerup !== "object")
                    throw TypeError(".common.Event.playerGetPowerup: object expected");
                message.playerGetPowerup = $root.common.PlayerGetPowerupData.fromObject(object.playerGetPowerup);
            }
            if (object.playerPlantBomb != null) {
                if (typeof object.playerPlantBomb !== "object")
                    throw TypeError(".common.Event.playerPlantBomb: object expected");
                message.playerPlantBomb = $root.common.PlayerPlantBombData.fromObject(object.playerPlantBomb);
            }
            if (object.playerMoved != null) {
                if (typeof object.playerMoved !== "object")
                    throw TypeError(".common.Event.playerMoved: object expected");
                message.playerMoved = $root.common.PlayerMovedData.fromObject(object.playerMoved);
            }
            if (object.playerDead != null) {
                if (typeof object.playerDead !== "object")
                    throw TypeError(".common.Event.playerDead: object expected");
                message.playerDead = $root.common.PlayerDeadData.fromObject(object.playerDead);
            }
            if (object.bombPlanted != null) {
                if (typeof object.bombPlanted !== "object")
                    throw TypeError(".common.Event.bombPlanted: object expected");
                message.bombPlanted = $root.common.BombPlantedData.fromObject(object.bombPlanted);
            }
            if (object.bombWillExplode != null) {
                if (typeof object.bombWillExplode !== "object")
                    throw TypeError(".common.Event.bombWillExplode: object expected");
                message.bombWillExplode = $root.common.BombWillExplodeData.fromObject(object.bombWillExplode);
            }
            if (object.bombExploded != null) {
                if (typeof object.bombExploded !== "object")
                    throw TypeError(".common.Event.bombExploded: object expected");
                message.bombExploded = $root.common.BombExplodedData.fromObject(object.bombExploded);
            }
            if (object.boxRemoved != null) {
                if (typeof object.boxRemoved !== "object")
                    throw TypeError(".common.Event.boxRemoved: object expected");
                message.boxRemoved = $root.common.BoxRemovedData.fromObject(object.boxRemoved);
            }
            if (object.powerupDropped != null) {
                if (typeof object.powerupDropped !== "object")
                    throw TypeError(".common.Event.powerupDropped: object expected");
                message.powerupDropped = $root.common.PowerupDroppedData.fromObject(object.powerupDropped);
            }
            if (object.powerupConsumed != null) {
                if (typeof object.powerupConsumed !== "object")
                    throw TypeError(".common.Event.powerupConsumed: object expected");
                message.powerupConsumed = $root.common.PowerupConsumedData.fromObject(object.powerupConsumed);
            }
            return message;
        };

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Event
         * @static
         * @param {common.Event} message Event
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Event.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "SessionRun" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.gameId = 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.common.EventType[message.type] === undefined ? message.type : $root.common.EventType[message.type] : message.type;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.newMatch != null && message.hasOwnProperty("newMatch")) {
                object.newMatch = $root.common.NewMatchData.toObject(message.newMatch, options);
                if (options.oneofs)
                    object.data = "newMatch";
            }
            if (message.countdown != null && message.hasOwnProperty("countdown")) {
                object.countdown = $root.common.CountdownData.toObject(message.countdown, options);
                if (options.oneofs)
                    object.data = "countdown";
            }
            if (message.gameOver != null && message.hasOwnProperty("gameOver")) {
                object.gameOver = $root.common.GameOverData.toObject(message.gameOver, options);
                if (options.oneofs)
                    object.data = "gameOver";
            }
            if (message.crash != null && message.hasOwnProperty("crash")) {
                object.crash = $root.common.CrashData.toObject(message.crash, options);
                if (options.oneofs)
                    object.data = "crash";
            }
            if (message.playerReady != null && message.hasOwnProperty("playerReady")) {
                object.playerReady = $root.common.PlayerReadyData.toObject(message.playerReady, options);
                if (options.oneofs)
                    object.data = "playerReady";
            }
            if (message.playerMove != null && message.hasOwnProperty("playerMove")) {
                object.playerMove = $root.common.PlayerMoveData.toObject(message.playerMove, options);
                if (options.oneofs)
                    object.data = "playerMove";
            }
            if (message.playerGetPowerup != null && message.hasOwnProperty("playerGetPowerup")) {
                object.playerGetPowerup = $root.common.PlayerGetPowerupData.toObject(message.playerGetPowerup, options);
                if (options.oneofs)
                    object.data = "playerGetPowerup";
            }
            if (message.playerPlantBomb != null && message.hasOwnProperty("playerPlantBomb")) {
                object.playerPlantBomb = $root.common.PlayerPlantBombData.toObject(message.playerPlantBomb, options);
                if (options.oneofs)
                    object.data = "playerPlantBomb";
            }
            if (message.playerMoved != null && message.hasOwnProperty("playerMoved")) {
                object.playerMoved = $root.common.PlayerMovedData.toObject(message.playerMoved, options);
                if (options.oneofs)
                    object.data = "playerMoved";
            }
            if (message.playerDead != null && message.hasOwnProperty("playerDead")) {
                object.playerDead = $root.common.PlayerDeadData.toObject(message.playerDead, options);
                if (options.oneofs)
                    object.data = "playerDead";
            }
            if (message.bombPlanted != null && message.hasOwnProperty("bombPlanted")) {
                object.bombPlanted = $root.common.BombPlantedData.toObject(message.bombPlanted, options);
                if (options.oneofs)
                    object.data = "bombPlanted";
            }
            if (message.bombWillExplode != null && message.hasOwnProperty("bombWillExplode")) {
                object.bombWillExplode = $root.common.BombWillExplodeData.toObject(message.bombWillExplode, options);
                if (options.oneofs)
                    object.data = "bombWillExplode";
            }
            if (message.bombExploded != null && message.hasOwnProperty("bombExploded")) {
                object.bombExploded = $root.common.BombExplodedData.toObject(message.bombExploded, options);
                if (options.oneofs)
                    object.data = "bombExploded";
            }
            if (message.boxRemoved != null && message.hasOwnProperty("boxRemoved")) {
                object.boxRemoved = $root.common.BoxRemovedData.toObject(message.boxRemoved, options);
                if (options.oneofs)
                    object.data = "boxRemoved";
            }
            if (message.powerupDropped != null && message.hasOwnProperty("powerupDropped")) {
                object.powerupDropped = $root.common.PowerupDroppedData.toObject(message.powerupDropped, options);
                if (options.oneofs)
                    object.data = "powerupDropped";
            }
            if (message.powerupConsumed != null && message.hasOwnProperty("powerupConsumed")) {
                object.powerupConsumed = $root.common.PowerupConsumedData.toObject(message.powerupConsumed, options);
                if (options.oneofs)
                    object.data = "powerupConsumed";
            }
            return object;
        };

        /**
         * Converts this Event to JSON.
         * @function toJSON
         * @memberof common.Event
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Event.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Event
         * @function getTypeUrl
         * @memberof common.Event
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Event";
        };

        return Event;
    })();

    common.CountdownData = (function() {

        /**
         * Properties of a CountdownData.
         * @memberof common
         * @interface ICountdownData
         * @property {number|Long|null} [startTs] CountdownData startTs
         * @property {number|Long|null} [endTs] CountdownData endTs
         */

        /**
         * Constructs a new CountdownData.
         * @memberof common
         * @classdesc Represents a CountdownData.
         * @implements ICountdownData
         * @constructor
         * @param {common.ICountdownData=} [properties] Properties to set
         */
        function CountdownData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CountdownData startTs.
         * @member {number|Long} startTs
         * @memberof common.CountdownData
         * @instance
         */
        CountdownData.prototype.startTs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * CountdownData endTs.
         * @member {number|Long} endTs
         * @memberof common.CountdownData
         * @instance
         */
        CountdownData.prototype.endTs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new CountdownData instance using the specified properties.
         * @function create
         * @memberof common.CountdownData
         * @static
         * @param {common.ICountdownData=} [properties] Properties to set
         * @returns {common.CountdownData} CountdownData instance
         */
        CountdownData.create = function create(properties) {
            return new CountdownData(properties);
        };

        /**
         * Encodes the specified CountdownData message. Does not implicitly {@link common.CountdownData.verify|verify} messages.
         * @function encode
         * @memberof common.CountdownData
         * @static
         * @param {common.ICountdownData} message CountdownData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CountdownData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.startTs != null && Object.hasOwnProperty.call(message, "startTs"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.startTs);
            if (message.endTs != null && Object.hasOwnProperty.call(message, "endTs"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.endTs);
            return writer;
        };

        /**
         * Encodes the specified CountdownData message, length delimited. Does not implicitly {@link common.CountdownData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.CountdownData
         * @static
         * @param {common.ICountdownData} message CountdownData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CountdownData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CountdownData message from the specified reader or buffer.
         * @function decode
         * @memberof common.CountdownData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.CountdownData} CountdownData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CountdownData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.CountdownData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.startTs = reader.int64();
                        break;
                    }
                case 2: {
                        message.endTs = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CountdownData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.CountdownData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.CountdownData} CountdownData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CountdownData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CountdownData message.
         * @function verify
         * @memberof common.CountdownData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CountdownData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.startTs != null && message.hasOwnProperty("startTs"))
                if (!$util.isInteger(message.startTs) && !(message.startTs && $util.isInteger(message.startTs.low) && $util.isInteger(message.startTs.high)))
                    return "startTs: integer|Long expected";
            if (message.endTs != null && message.hasOwnProperty("endTs"))
                if (!$util.isInteger(message.endTs) && !(message.endTs && $util.isInteger(message.endTs.low) && $util.isInteger(message.endTs.high)))
                    return "endTs: integer|Long expected";
            return null;
        };

        /**
         * Creates a CountdownData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.CountdownData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.CountdownData} CountdownData
         */
        CountdownData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.CountdownData)
                return object;
            let message = new $root.common.CountdownData();
            if (object.startTs != null)
                if ($util.Long)
                    (message.startTs = $util.Long.fromValue(object.startTs)).unsigned = false;
                else if (typeof object.startTs === "string")
                    message.startTs = parseInt(object.startTs, 10);
                else if (typeof object.startTs === "number")
                    message.startTs = object.startTs;
                else if (typeof object.startTs === "object")
                    message.startTs = new $util.LongBits(object.startTs.low >>> 0, object.startTs.high >>> 0).toNumber();
            if (object.endTs != null)
                if ($util.Long)
                    (message.endTs = $util.Long.fromValue(object.endTs)).unsigned = false;
                else if (typeof object.endTs === "string")
                    message.endTs = parseInt(object.endTs, 10);
                else if (typeof object.endTs === "number")
                    message.endTs = object.endTs;
                else if (typeof object.endTs === "object")
                    message.endTs = new $util.LongBits(object.endTs.low >>> 0, object.endTs.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CountdownData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.CountdownData
         * @static
         * @param {common.CountdownData} message CountdownData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CountdownData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startTs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.startTs = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.endTs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.endTs = options.longs === String ? "0" : 0;
            }
            if (message.startTs != null && message.hasOwnProperty("startTs"))
                if (typeof message.startTs === "number")
                    object.startTs = options.longs === String ? String(message.startTs) : message.startTs;
                else
                    object.startTs = options.longs === String ? $util.Long.prototype.toString.call(message.startTs) : options.longs === Number ? new $util.LongBits(message.startTs.low >>> 0, message.startTs.high >>> 0).toNumber() : message.startTs;
            if (message.endTs != null && message.hasOwnProperty("endTs"))
                if (typeof message.endTs === "number")
                    object.endTs = options.longs === String ? String(message.endTs) : message.endTs;
                else
                    object.endTs = options.longs === String ? $util.Long.prototype.toString.call(message.endTs) : options.longs === Number ? new $util.LongBits(message.endTs.low >>> 0, message.endTs.high >>> 0).toNumber() : message.endTs;
            return object;
        };

        /**
         * Converts this CountdownData to JSON.
         * @function toJSON
         * @memberof common.CountdownData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CountdownData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CountdownData
         * @function getTypeUrl
         * @memberof common.CountdownData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CountdownData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.CountdownData";
        };

        return CountdownData;
    })();

    common.GameOverData = (function() {

        /**
         * Properties of a GameOverData.
         * @memberof common
         * @interface IGameOverData
         * @property {string|null} [reason] GameOverData reason
         * @property {number|null} [winnerUserId] GameOverData winnerUserId
         */

        /**
         * Constructs a new GameOverData.
         * @memberof common
         * @classdesc Represents a GameOverData.
         * @implements IGameOverData
         * @constructor
         * @param {common.IGameOverData=} [properties] Properties to set
         */
        function GameOverData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameOverData reason.
         * @member {string} reason
         * @memberof common.GameOverData
         * @instance
         */
        GameOverData.prototype.reason = "";

        /**
         * GameOverData winnerUserId.
         * @member {number} winnerUserId
         * @memberof common.GameOverData
         * @instance
         */
        GameOverData.prototype.winnerUserId = 0;

        /**
         * Creates a new GameOverData instance using the specified properties.
         * @function create
         * @memberof common.GameOverData
         * @static
         * @param {common.IGameOverData=} [properties] Properties to set
         * @returns {common.GameOverData} GameOverData instance
         */
        GameOverData.create = function create(properties) {
            return new GameOverData(properties);
        };

        /**
         * Encodes the specified GameOverData message. Does not implicitly {@link common.GameOverData.verify|verify} messages.
         * @function encode
         * @memberof common.GameOverData
         * @static
         * @param {common.IGameOverData} message GameOverData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOverData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reason);
            if (message.winnerUserId != null && Object.hasOwnProperty.call(message, "winnerUserId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.winnerUserId);
            return writer;
        };

        /**
         * Encodes the specified GameOverData message, length delimited. Does not implicitly {@link common.GameOverData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.GameOverData
         * @static
         * @param {common.IGameOverData} message GameOverData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOverData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameOverData message from the specified reader or buffer.
         * @function decode
         * @memberof common.GameOverData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.GameOverData} GameOverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOverData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.GameOverData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.reason = reader.string();
                        break;
                    }
                case 2: {
                        message.winnerUserId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameOverData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.GameOverData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.GameOverData} GameOverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOverData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameOverData message.
         * @function verify
         * @memberof common.GameOverData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameOverData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                if (!$util.isString(message.reason))
                    return "reason: string expected";
            if (message.winnerUserId != null && message.hasOwnProperty("winnerUserId"))
                if (!$util.isInteger(message.winnerUserId))
                    return "winnerUserId: integer expected";
            return null;
        };

        /**
         * Creates a GameOverData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.GameOverData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.GameOverData} GameOverData
         */
        GameOverData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.GameOverData)
                return object;
            let message = new $root.common.GameOverData();
            if (object.reason != null)
                message.reason = String(object.reason);
            if (object.winnerUserId != null)
                message.winnerUserId = object.winnerUserId | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameOverData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.GameOverData
         * @static
         * @param {common.GameOverData} message GameOverData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameOverData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.reason = "";
                object.winnerUserId = 0;
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            if (message.winnerUserId != null && message.hasOwnProperty("winnerUserId"))
                object.winnerUserId = message.winnerUserId;
            return object;
        };

        /**
         * Converts this GameOverData to JSON.
         * @function toJSON
         * @memberof common.GameOverData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameOverData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameOverData
         * @function getTypeUrl
         * @memberof common.GameOverData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameOverData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.GameOverData";
        };

        return GameOverData;
    })();

    common.CrashData = (function() {

        /**
         * Properties of a CrashData.
         * @memberof common
         * @interface ICrashData
         * @property {string|null} [reason] CrashData reason
         */

        /**
         * Constructs a new CrashData.
         * @memberof common
         * @classdesc Represents a CrashData.
         * @implements ICrashData
         * @constructor
         * @param {common.ICrashData=} [properties] Properties to set
         */
        function CrashData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CrashData reason.
         * @member {string} reason
         * @memberof common.CrashData
         * @instance
         */
        CrashData.prototype.reason = "";

        /**
         * Creates a new CrashData instance using the specified properties.
         * @function create
         * @memberof common.CrashData
         * @static
         * @param {common.ICrashData=} [properties] Properties to set
         * @returns {common.CrashData} CrashData instance
         */
        CrashData.create = function create(properties) {
            return new CrashData(properties);
        };

        /**
         * Encodes the specified CrashData message. Does not implicitly {@link common.CrashData.verify|verify} messages.
         * @function encode
         * @memberof common.CrashData
         * @static
         * @param {common.ICrashData} message CrashData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CrashData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reason);
            return writer;
        };

        /**
         * Encodes the specified CrashData message, length delimited. Does not implicitly {@link common.CrashData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.CrashData
         * @static
         * @param {common.ICrashData} message CrashData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CrashData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CrashData message from the specified reader or buffer.
         * @function decode
         * @memberof common.CrashData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.CrashData} CrashData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CrashData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.CrashData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.reason = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CrashData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.CrashData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.CrashData} CrashData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CrashData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CrashData message.
         * @function verify
         * @memberof common.CrashData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CrashData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                if (!$util.isString(message.reason))
                    return "reason: string expected";
            return null;
        };

        /**
         * Creates a CrashData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.CrashData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.CrashData} CrashData
         */
        CrashData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.CrashData)
                return object;
            let message = new $root.common.CrashData();
            if (object.reason != null)
                message.reason = String(object.reason);
            return message;
        };

        /**
         * Creates a plain object from a CrashData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.CrashData
         * @static
         * @param {common.CrashData} message CrashData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CrashData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.reason = "";
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            return object;
        };

        /**
         * Converts this CrashData to JSON.
         * @function toJSON
         * @memberof common.CrashData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CrashData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CrashData
         * @function getTypeUrl
         * @memberof common.CrashData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CrashData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.CrashData";
        };

        return CrashData;
    })();

    common.NewMatchData = (function() {

        /**
         * Properties of a NewMatchData.
         * @memberof common
         * @interface INewMatchData
         * @property {Array.<number>|null} [players] NewMatchData players
         */

        /**
         * Constructs a new NewMatchData.
         * @memberof common
         * @classdesc Represents a NewMatchData.
         * @implements INewMatchData
         * @constructor
         * @param {common.INewMatchData=} [properties] Properties to set
         */
        function NewMatchData(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NewMatchData players.
         * @member {Array.<number>} players
         * @memberof common.NewMatchData
         * @instance
         */
        NewMatchData.prototype.players = $util.emptyArray;

        /**
         * Creates a new NewMatchData instance using the specified properties.
         * @function create
         * @memberof common.NewMatchData
         * @static
         * @param {common.INewMatchData=} [properties] Properties to set
         * @returns {common.NewMatchData} NewMatchData instance
         */
        NewMatchData.create = function create(properties) {
            return new NewMatchData(properties);
        };

        /**
         * Encodes the specified NewMatchData message. Does not implicitly {@link common.NewMatchData.verify|verify} messages.
         * @function encode
         * @memberof common.NewMatchData
         * @static
         * @param {common.INewMatchData} message NewMatchData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewMatchData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.players.length; ++i)
                    writer.int32(message.players[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified NewMatchData message, length delimited. Does not implicitly {@link common.NewMatchData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.NewMatchData
         * @static
         * @param {common.INewMatchData} message NewMatchData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewMatchData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NewMatchData message from the specified reader or buffer.
         * @function decode
         * @memberof common.NewMatchData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.NewMatchData} NewMatchData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewMatchData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.NewMatchData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.players.push(reader.int32());
                        } else
                            message.players.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NewMatchData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.NewMatchData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.NewMatchData} NewMatchData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewMatchData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NewMatchData message.
         * @function verify
         * @memberof common.NewMatchData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NewMatchData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i)
                    if (!$util.isInteger(message.players[i]))
                        return "players: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a NewMatchData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.NewMatchData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.NewMatchData} NewMatchData
         */
        NewMatchData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.NewMatchData)
                return object;
            let message = new $root.common.NewMatchData();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".common.NewMatchData.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i)
                    message.players[i] = object.players[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a NewMatchData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.NewMatchData
         * @static
         * @param {common.NewMatchData} message NewMatchData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NewMatchData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = message.players[j];
            }
            return object;
        };

        /**
         * Converts this NewMatchData to JSON.
         * @function toJSON
         * @memberof common.NewMatchData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NewMatchData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NewMatchData
         * @function getTypeUrl
         * @memberof common.NewMatchData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NewMatchData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.NewMatchData";
        };

        return NewMatchData;
    })();

    common.PlayerReadyData = (function() {

        /**
         * Properties of a PlayerReadyData.
         * @memberof common
         * @interface IPlayerReadyData
         * @property {number|null} [userId] PlayerReadyData userId
         */

        /**
         * Constructs a new PlayerReadyData.
         * @memberof common
         * @classdesc Represents a PlayerReadyData.
         * @implements IPlayerReadyData
         * @constructor
         * @param {common.IPlayerReadyData=} [properties] Properties to set
         */
        function PlayerReadyData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerReadyData userId.
         * @member {number} userId
         * @memberof common.PlayerReadyData
         * @instance
         */
        PlayerReadyData.prototype.userId = 0;

        /**
         * Creates a new PlayerReadyData instance using the specified properties.
         * @function create
         * @memberof common.PlayerReadyData
         * @static
         * @param {common.IPlayerReadyData=} [properties] Properties to set
         * @returns {common.PlayerReadyData} PlayerReadyData instance
         */
        PlayerReadyData.create = function create(properties) {
            return new PlayerReadyData(properties);
        };

        /**
         * Encodes the specified PlayerReadyData message. Does not implicitly {@link common.PlayerReadyData.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerReadyData
         * @static
         * @param {common.IPlayerReadyData} message PlayerReadyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerReadyData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified PlayerReadyData message, length delimited. Does not implicitly {@link common.PlayerReadyData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerReadyData
         * @static
         * @param {common.IPlayerReadyData} message PlayerReadyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerReadyData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerReadyData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerReadyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerReadyData} PlayerReadyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerReadyData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerReadyData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerReadyData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerReadyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerReadyData} PlayerReadyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerReadyData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerReadyData message.
         * @function verify
         * @memberof common.PlayerReadyData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerReadyData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a PlayerReadyData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerReadyData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerReadyData} PlayerReadyData
         */
        PlayerReadyData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerReadyData)
                return object;
            let message = new $root.common.PlayerReadyData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerReadyData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerReadyData
         * @static
         * @param {common.PlayerReadyData} message PlayerReadyData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerReadyData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this PlayerReadyData to JSON.
         * @function toJSON
         * @memberof common.PlayerReadyData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerReadyData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerReadyData
         * @function getTypeUrl
         * @memberof common.PlayerReadyData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerReadyData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerReadyData";
        };

        return PlayerReadyData;
    })();

    common.PlayerMoveData = (function() {

        /**
         * Properties of a PlayerMoveData.
         * @memberof common
         * @interface IPlayerMoveData
         * @property {number|null} [userId] PlayerMoveData userId
         * @property {number|null} [x] PlayerMoveData x
         * @property {number|null} [y] PlayerMoveData y
         * @property {number|null} [pixelX] PlayerMoveData pixelX
         * @property {number|null} [pixelY] PlayerMoveData pixelY
         */

        /**
         * Constructs a new PlayerMoveData.
         * @memberof common
         * @classdesc Represents a PlayerMoveData.
         * @implements IPlayerMoveData
         * @constructor
         * @param {common.IPlayerMoveData=} [properties] Properties to set
         */
        function PlayerMoveData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerMoveData userId.
         * @member {number} userId
         * @memberof common.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.userId = 0;

        /**
         * PlayerMoveData x.
         * @member {number} x
         * @memberof common.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.x = 0;

        /**
         * PlayerMoveData y.
         * @member {number} y
         * @memberof common.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.y = 0;

        /**
         * PlayerMoveData pixelX.
         * @member {number} pixelX
         * @memberof common.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.pixelX = 0;

        /**
         * PlayerMoveData pixelY.
         * @member {number} pixelY
         * @memberof common.PlayerMoveData
         * @instance
         */
        PlayerMoveData.prototype.pixelY = 0;

        /**
         * Creates a new PlayerMoveData instance using the specified properties.
         * @function create
         * @memberof common.PlayerMoveData
         * @static
         * @param {common.IPlayerMoveData=} [properties] Properties to set
         * @returns {common.PlayerMoveData} PlayerMoveData instance
         */
        PlayerMoveData.create = function create(properties) {
            return new PlayerMoveData(properties);
        };

        /**
         * Encodes the specified PlayerMoveData message. Does not implicitly {@link common.PlayerMoveData.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerMoveData
         * @static
         * @param {common.IPlayerMoveData} message PlayerMoveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerMoveData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            if (message.pixelX != null && Object.hasOwnProperty.call(message, "pixelX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pixelX);
            if (message.pixelY != null && Object.hasOwnProperty.call(message, "pixelY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.pixelY);
            return writer;
        };

        /**
         * Encodes the specified PlayerMoveData message, length delimited. Does not implicitly {@link common.PlayerMoveData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerMoveData
         * @static
         * @param {common.IPlayerMoveData} message PlayerMoveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerMoveData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerMoveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerMoveData} PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerMoveData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerMoveData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.x = reader.int32();
                        break;
                    }
                case 3: {
                        message.y = reader.int32();
                        break;
                    }
                case 4: {
                        message.pixelX = reader.int32();
                        break;
                    }
                case 5: {
                        message.pixelY = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerMoveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerMoveData} PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerMoveData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerMoveData message.
         * @function verify
         * @memberof common.PlayerMoveData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerMoveData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.pixelX != null && message.hasOwnProperty("pixelX"))
                if (!$util.isInteger(message.pixelX))
                    return "pixelX: integer expected";
            if (message.pixelY != null && message.hasOwnProperty("pixelY"))
                if (!$util.isInteger(message.pixelY))
                    return "pixelY: integer expected";
            return null;
        };

        /**
         * Creates a PlayerMoveData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerMoveData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerMoveData} PlayerMoveData
         */
        PlayerMoveData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerMoveData)
                return object;
            let message = new $root.common.PlayerMoveData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.pixelX != null)
                message.pixelX = object.pixelX | 0;
            if (object.pixelY != null)
                message.pixelY = object.pixelY | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerMoveData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerMoveData
         * @static
         * @param {common.PlayerMoveData} message PlayerMoveData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerMoveData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.x = 0;
                object.y = 0;
                object.pixelX = 0;
                object.pixelY = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.pixelX != null && message.hasOwnProperty("pixelX"))
                object.pixelX = message.pixelX;
            if (message.pixelY != null && message.hasOwnProperty("pixelY"))
                object.pixelY = message.pixelY;
            return object;
        };

        /**
         * Converts this PlayerMoveData to JSON.
         * @function toJSON
         * @memberof common.PlayerMoveData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerMoveData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerMoveData
         * @function getTypeUrl
         * @memberof common.PlayerMoveData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerMoveData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerMoveData";
        };

        return PlayerMoveData;
    })();

    common.PlayerGetPowerupData = (function() {

        /**
         * Properties of a PlayerGetPowerupData.
         * @memberof common
         * @interface IPlayerGetPowerupData
         * @property {number|null} [userId] PlayerGetPowerupData userId
         * @property {number|null} [x] PlayerGetPowerupData x
         * @property {number|null} [y] PlayerGetPowerupData y
         */

        /**
         * Constructs a new PlayerGetPowerupData.
         * @memberof common
         * @classdesc Represents a PlayerGetPowerupData.
         * @implements IPlayerGetPowerupData
         * @constructor
         * @param {common.IPlayerGetPowerupData=} [properties] Properties to set
         */
        function PlayerGetPowerupData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerGetPowerupData userId.
         * @member {number} userId
         * @memberof common.PlayerGetPowerupData
         * @instance
         */
        PlayerGetPowerupData.prototype.userId = 0;

        /**
         * PlayerGetPowerupData x.
         * @member {number} x
         * @memberof common.PlayerGetPowerupData
         * @instance
         */
        PlayerGetPowerupData.prototype.x = 0;

        /**
         * PlayerGetPowerupData y.
         * @member {number} y
         * @memberof common.PlayerGetPowerupData
         * @instance
         */
        PlayerGetPowerupData.prototype.y = 0;

        /**
         * Creates a new PlayerGetPowerupData instance using the specified properties.
         * @function create
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {common.IPlayerGetPowerupData=} [properties] Properties to set
         * @returns {common.PlayerGetPowerupData} PlayerGetPowerupData instance
         */
        PlayerGetPowerupData.create = function create(properties) {
            return new PlayerGetPowerupData(properties);
        };

        /**
         * Encodes the specified PlayerGetPowerupData message. Does not implicitly {@link common.PlayerGetPowerupData.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {common.IPlayerGetPowerupData} message PlayerGetPowerupData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGetPowerupData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            return writer;
        };

        /**
         * Encodes the specified PlayerGetPowerupData message, length delimited. Does not implicitly {@link common.PlayerGetPowerupData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {common.IPlayerGetPowerupData} message PlayerGetPowerupData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerGetPowerupData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerGetPowerupData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerGetPowerupData} PlayerGetPowerupData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGetPowerupData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerGetPowerupData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.x = reader.int32();
                        break;
                    }
                case 3: {
                        message.y = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerGetPowerupData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerGetPowerupData} PlayerGetPowerupData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerGetPowerupData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerGetPowerupData message.
         * @function verify
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerGetPowerupData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };

        /**
         * Creates a PlayerGetPowerupData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerGetPowerupData} PlayerGetPowerupData
         */
        PlayerGetPowerupData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerGetPowerupData)
                return object;
            let message = new $root.common.PlayerGetPowerupData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerGetPowerupData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {common.PlayerGetPowerupData} message PlayerGetPowerupData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerGetPowerupData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.x = 0;
                object.y = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            return object;
        };

        /**
         * Converts this PlayerGetPowerupData to JSON.
         * @function toJSON
         * @memberof common.PlayerGetPowerupData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerGetPowerupData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerGetPowerupData
         * @function getTypeUrl
         * @memberof common.PlayerGetPowerupData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerGetPowerupData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerGetPowerupData";
        };

        return PlayerGetPowerupData;
    })();

    common.PlayerPlantBombData = (function() {

        /**
         * Properties of a PlayerPlantBombData.
         * @memberof common
         * @interface IPlayerPlantBombData
         * @property {number|null} [userId] PlayerPlantBombData userId
         * @property {number|null} [x] PlayerPlantBombData x
         * @property {number|null} [y] PlayerPlantBombData y
         */

        /**
         * Constructs a new PlayerPlantBombData.
         * @memberof common
         * @classdesc Represents a PlayerPlantBombData.
         * @implements IPlayerPlantBombData
         * @constructor
         * @param {common.IPlayerPlantBombData=} [properties] Properties to set
         */
        function PlayerPlantBombData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerPlantBombData userId.
         * @member {number} userId
         * @memberof common.PlayerPlantBombData
         * @instance
         */
        PlayerPlantBombData.prototype.userId = 0;

        /**
         * PlayerPlantBombData x.
         * @member {number} x
         * @memberof common.PlayerPlantBombData
         * @instance
         */
        PlayerPlantBombData.prototype.x = 0;

        /**
         * PlayerPlantBombData y.
         * @member {number} y
         * @memberof common.PlayerPlantBombData
         * @instance
         */
        PlayerPlantBombData.prototype.y = 0;

        /**
         * Creates a new PlayerPlantBombData instance using the specified properties.
         * @function create
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {common.IPlayerPlantBombData=} [properties] Properties to set
         * @returns {common.PlayerPlantBombData} PlayerPlantBombData instance
         */
        PlayerPlantBombData.create = function create(properties) {
            return new PlayerPlantBombData(properties);
        };

        /**
         * Encodes the specified PlayerPlantBombData message. Does not implicitly {@link common.PlayerPlantBombData.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {common.IPlayerPlantBombData} message PlayerPlantBombData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerPlantBombData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            return writer;
        };

        /**
         * Encodes the specified PlayerPlantBombData message, length delimited. Does not implicitly {@link common.PlayerPlantBombData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {common.IPlayerPlantBombData} message PlayerPlantBombData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerPlantBombData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerPlantBombData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerPlantBombData} PlayerPlantBombData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerPlantBombData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerPlantBombData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.x = reader.int32();
                        break;
                    }
                case 3: {
                        message.y = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerPlantBombData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerPlantBombData} PlayerPlantBombData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerPlantBombData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerPlantBombData message.
         * @function verify
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerPlantBombData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };

        /**
         * Creates a PlayerPlantBombData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerPlantBombData} PlayerPlantBombData
         */
        PlayerPlantBombData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerPlantBombData)
                return object;
            let message = new $root.common.PlayerPlantBombData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerPlantBombData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {common.PlayerPlantBombData} message PlayerPlantBombData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerPlantBombData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.x = 0;
                object.y = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            return object;
        };

        /**
         * Converts this PlayerPlantBombData to JSON.
         * @function toJSON
         * @memberof common.PlayerPlantBombData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerPlantBombData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerPlantBombData
         * @function getTypeUrl
         * @memberof common.PlayerPlantBombData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerPlantBombData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerPlantBombData";
        };

        return PlayerPlantBombData;
    })();

    common.PlayerMovedData = (function() {

        /**
         * Properties of a PlayerMovedData.
         * @memberof common
         * @interface IPlayerMovedData
         * @property {number|null} [userId] PlayerMovedData userId
         * @property {number|null} [x] PlayerMovedData x
         * @property {number|null} [y] PlayerMovedData y
         * @property {number|null} [pixelX] PlayerMovedData pixelX
         * @property {number|null} [pixelY] PlayerMovedData pixelY
         */

        /**
         * Constructs a new PlayerMovedData.
         * @memberof common
         * @classdesc Represents a PlayerMovedData.
         * @implements IPlayerMovedData
         * @constructor
         * @param {common.IPlayerMovedData=} [properties] Properties to set
         */
        function PlayerMovedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerMovedData userId.
         * @member {number} userId
         * @memberof common.PlayerMovedData
         * @instance
         */
        PlayerMovedData.prototype.userId = 0;

        /**
         * PlayerMovedData x.
         * @member {number} x
         * @memberof common.PlayerMovedData
         * @instance
         */
        PlayerMovedData.prototype.x = 0;

        /**
         * PlayerMovedData y.
         * @member {number} y
         * @memberof common.PlayerMovedData
         * @instance
         */
        PlayerMovedData.prototype.y = 0;

        /**
         * PlayerMovedData pixelX.
         * @member {number} pixelX
         * @memberof common.PlayerMovedData
         * @instance
         */
        PlayerMovedData.prototype.pixelX = 0;

        /**
         * PlayerMovedData pixelY.
         * @member {number} pixelY
         * @memberof common.PlayerMovedData
         * @instance
         */
        PlayerMovedData.prototype.pixelY = 0;

        /**
         * Creates a new PlayerMovedData instance using the specified properties.
         * @function create
         * @memberof common.PlayerMovedData
         * @static
         * @param {common.IPlayerMovedData=} [properties] Properties to set
         * @returns {common.PlayerMovedData} PlayerMovedData instance
         */
        PlayerMovedData.create = function create(properties) {
            return new PlayerMovedData(properties);
        };

        /**
         * Encodes the specified PlayerMovedData message. Does not implicitly {@link common.PlayerMovedData.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerMovedData
         * @static
         * @param {common.IPlayerMovedData} message PlayerMovedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerMovedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            if (message.pixelX != null && Object.hasOwnProperty.call(message, "pixelX"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pixelX);
            if (message.pixelY != null && Object.hasOwnProperty.call(message, "pixelY"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.pixelY);
            return writer;
        };

        /**
         * Encodes the specified PlayerMovedData message, length delimited. Does not implicitly {@link common.PlayerMovedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerMovedData
         * @static
         * @param {common.IPlayerMovedData} message PlayerMovedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerMovedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerMovedData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerMovedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerMovedData} PlayerMovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerMovedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerMovedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.x = reader.int32();
                        break;
                    }
                case 3: {
                        message.y = reader.int32();
                        break;
                    }
                case 4: {
                        message.pixelX = reader.int32();
                        break;
                    }
                case 5: {
                        message.pixelY = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerMovedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerMovedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerMovedData} PlayerMovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerMovedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerMovedData message.
         * @function verify
         * @memberof common.PlayerMovedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerMovedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.pixelX != null && message.hasOwnProperty("pixelX"))
                if (!$util.isInteger(message.pixelX))
                    return "pixelX: integer expected";
            if (message.pixelY != null && message.hasOwnProperty("pixelY"))
                if (!$util.isInteger(message.pixelY))
                    return "pixelY: integer expected";
            return null;
        };

        /**
         * Creates a PlayerMovedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerMovedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerMovedData} PlayerMovedData
         */
        PlayerMovedData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerMovedData)
                return object;
            let message = new $root.common.PlayerMovedData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.pixelX != null)
                message.pixelX = object.pixelX | 0;
            if (object.pixelY != null)
                message.pixelY = object.pixelY | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerMovedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerMovedData
         * @static
         * @param {common.PlayerMovedData} message PlayerMovedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerMovedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.x = 0;
                object.y = 0;
                object.pixelX = 0;
                object.pixelY = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.pixelX != null && message.hasOwnProperty("pixelX"))
                object.pixelX = message.pixelX;
            if (message.pixelY != null && message.hasOwnProperty("pixelY"))
                object.pixelY = message.pixelY;
            return object;
        };

        /**
         * Converts this PlayerMovedData to JSON.
         * @function toJSON
         * @memberof common.PlayerMovedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerMovedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerMovedData
         * @function getTypeUrl
         * @memberof common.PlayerMovedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerMovedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerMovedData";
        };

        return PlayerMovedData;
    })();

    common.PlayerDeadData = (function() {

        /**
         * Properties of a PlayerDeadData.
         * @memberof common
         * @interface IPlayerDeadData
         * @property {number|null} [userId] PlayerDeadData userId
         */

        /**
         * Constructs a new PlayerDeadData.
         * @memberof common
         * @classdesc Represents a PlayerDeadData.
         * @implements IPlayerDeadData
         * @constructor
         * @param {common.IPlayerDeadData=} [properties] Properties to set
         */
        function PlayerDeadData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerDeadData userId.
         * @member {number} userId
         * @memberof common.PlayerDeadData
         * @instance
         */
        PlayerDeadData.prototype.userId = 0;

        /**
         * Creates a new PlayerDeadData instance using the specified properties.
         * @function create
         * @memberof common.PlayerDeadData
         * @static
         * @param {common.IPlayerDeadData=} [properties] Properties to set
         * @returns {common.PlayerDeadData} PlayerDeadData instance
         */
        PlayerDeadData.create = function create(properties) {
            return new PlayerDeadData(properties);
        };

        /**
         * Encodes the specified PlayerDeadData message. Does not implicitly {@link common.PlayerDeadData.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerDeadData
         * @static
         * @param {common.IPlayerDeadData} message PlayerDeadData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerDeadData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified PlayerDeadData message, length delimited. Does not implicitly {@link common.PlayerDeadData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerDeadData
         * @static
         * @param {common.IPlayerDeadData} message PlayerDeadData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerDeadData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerDeadData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerDeadData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerDeadData} PlayerDeadData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerDeadData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerDeadData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerDeadData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerDeadData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerDeadData} PlayerDeadData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerDeadData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerDeadData message.
         * @function verify
         * @memberof common.PlayerDeadData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerDeadData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a PlayerDeadData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerDeadData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerDeadData} PlayerDeadData
         */
        PlayerDeadData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerDeadData)
                return object;
            let message = new $root.common.PlayerDeadData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerDeadData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerDeadData
         * @static
         * @param {common.PlayerDeadData} message PlayerDeadData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerDeadData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this PlayerDeadData to JSON.
         * @function toJSON
         * @memberof common.PlayerDeadData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerDeadData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerDeadData
         * @function getTypeUrl
         * @memberof common.PlayerDeadData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerDeadData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerDeadData";
        };

        return PlayerDeadData;
    })();

    common.BombPlantedData = (function() {

        /**
         * Properties of a BombPlantedData.
         * @memberof common
         * @interface IBombPlantedData
         * @property {number|null} [x] BombPlantedData x
         * @property {number|null} [y] BombPlantedData y
         * @property {number|Long|null} [explodedAt] BombPlantedData explodedAt
         * @property {number|null} [userId] BombPlantedData userId
         * @property {number|null} [userBombcount] BombPlantedData userBombcount
         */

        /**
         * Constructs a new BombPlantedData.
         * @memberof common
         * @classdesc Represents a BombPlantedData.
         * @implements IBombPlantedData
         * @constructor
         * @param {common.IBombPlantedData=} [properties] Properties to set
         */
        function BombPlantedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BombPlantedData x.
         * @member {number} x
         * @memberof common.BombPlantedData
         * @instance
         */
        BombPlantedData.prototype.x = 0;

        /**
         * BombPlantedData y.
         * @member {number} y
         * @memberof common.BombPlantedData
         * @instance
         */
        BombPlantedData.prototype.y = 0;

        /**
         * BombPlantedData explodedAt.
         * @member {number|Long} explodedAt
         * @memberof common.BombPlantedData
         * @instance
         */
        BombPlantedData.prototype.explodedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BombPlantedData userId.
         * @member {number} userId
         * @memberof common.BombPlantedData
         * @instance
         */
        BombPlantedData.prototype.userId = 0;

        /**
         * BombPlantedData userBombcount.
         * @member {number} userBombcount
         * @memberof common.BombPlantedData
         * @instance
         */
        BombPlantedData.prototype.userBombcount = 0;

        /**
         * Creates a new BombPlantedData instance using the specified properties.
         * @function create
         * @memberof common.BombPlantedData
         * @static
         * @param {common.IBombPlantedData=} [properties] Properties to set
         * @returns {common.BombPlantedData} BombPlantedData instance
         */
        BombPlantedData.create = function create(properties) {
            return new BombPlantedData(properties);
        };

        /**
         * Encodes the specified BombPlantedData message. Does not implicitly {@link common.BombPlantedData.verify|verify} messages.
         * @function encode
         * @memberof common.BombPlantedData
         * @static
         * @param {common.IBombPlantedData} message BombPlantedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BombPlantedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.explodedAt != null && Object.hasOwnProperty.call(message, "explodedAt"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.explodedAt);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.userId);
            if (message.userBombcount != null && Object.hasOwnProperty.call(message, "userBombcount"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.userBombcount);
            return writer;
        };

        /**
         * Encodes the specified BombPlantedData message, length delimited. Does not implicitly {@link common.BombPlantedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.BombPlantedData
         * @static
         * @param {common.IBombPlantedData} message BombPlantedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BombPlantedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BombPlantedData message from the specified reader or buffer.
         * @function decode
         * @memberof common.BombPlantedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.BombPlantedData} BombPlantedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BombPlantedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.BombPlantedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.int32();
                        break;
                    }
                case 2: {
                        message.y = reader.int32();
                        break;
                    }
                case 3: {
                        message.explodedAt = reader.int64();
                        break;
                    }
                case 4: {
                        message.userId = reader.int32();
                        break;
                    }
                case 5: {
                        message.userBombcount = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BombPlantedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.BombPlantedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.BombPlantedData} BombPlantedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BombPlantedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BombPlantedData message.
         * @function verify
         * @memberof common.BombPlantedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BombPlantedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.explodedAt != null && message.hasOwnProperty("explodedAt"))
                if (!$util.isInteger(message.explodedAt) && !(message.explodedAt && $util.isInteger(message.explodedAt.low) && $util.isInteger(message.explodedAt.high)))
                    return "explodedAt: integer|Long expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.userBombcount != null && message.hasOwnProperty("userBombcount"))
                if (!$util.isInteger(message.userBombcount))
                    return "userBombcount: integer expected";
            return null;
        };

        /**
         * Creates a BombPlantedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.BombPlantedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.BombPlantedData} BombPlantedData
         */
        BombPlantedData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.BombPlantedData)
                return object;
            let message = new $root.common.BombPlantedData();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.explodedAt != null)
                if ($util.Long)
                    (message.explodedAt = $util.Long.fromValue(object.explodedAt)).unsigned = false;
                else if (typeof object.explodedAt === "string")
                    message.explodedAt = parseInt(object.explodedAt, 10);
                else if (typeof object.explodedAt === "number")
                    message.explodedAt = object.explodedAt;
                else if (typeof object.explodedAt === "object")
                    message.explodedAt = new $util.LongBits(object.explodedAt.low >>> 0, object.explodedAt.high >>> 0).toNumber();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.userBombcount != null)
                message.userBombcount = object.userBombcount | 0;
            return message;
        };

        /**
         * Creates a plain object from a BombPlantedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.BombPlantedData
         * @static
         * @param {common.BombPlantedData} message BombPlantedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BombPlantedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.explodedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.explodedAt = options.longs === String ? "0" : 0;
                object.userId = 0;
                object.userBombcount = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.explodedAt != null && message.hasOwnProperty("explodedAt"))
                if (typeof message.explodedAt === "number")
                    object.explodedAt = options.longs === String ? String(message.explodedAt) : message.explodedAt;
                else
                    object.explodedAt = options.longs === String ? $util.Long.prototype.toString.call(message.explodedAt) : options.longs === Number ? new $util.LongBits(message.explodedAt.low >>> 0, message.explodedAt.high >>> 0).toNumber() : message.explodedAt;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userBombcount != null && message.hasOwnProperty("userBombcount"))
                object.userBombcount = message.userBombcount;
            return object;
        };

        /**
         * Converts this BombPlantedData to JSON.
         * @function toJSON
         * @memberof common.BombPlantedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BombPlantedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BombPlantedData
         * @function getTypeUrl
         * @memberof common.BombPlantedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BombPlantedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.BombPlantedData";
        };

        return BombPlantedData;
    })();

    common.BombWillExplodeData = (function() {

        /**
         * Properties of a BombWillExplodeData.
         * @memberof common
         * @interface IBombWillExplodeData
         * @property {number|null} [x] BombWillExplodeData x
         * @property {number|null} [y] BombWillExplodeData y
         * @property {number|null} [bombFirepower] BombWillExplodeData bombFirepower
         * @property {number|null} [userId] BombWillExplodeData userId
         */

        /**
         * Constructs a new BombWillExplodeData.
         * @memberof common
         * @classdesc Represents a BombWillExplodeData.
         * @implements IBombWillExplodeData
         * @constructor
         * @param {common.IBombWillExplodeData=} [properties] Properties to set
         */
        function BombWillExplodeData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BombWillExplodeData x.
         * @member {number} x
         * @memberof common.BombWillExplodeData
         * @instance
         */
        BombWillExplodeData.prototype.x = 0;

        /**
         * BombWillExplodeData y.
         * @member {number} y
         * @memberof common.BombWillExplodeData
         * @instance
         */
        BombWillExplodeData.prototype.y = 0;

        /**
         * BombWillExplodeData bombFirepower.
         * @member {number} bombFirepower
         * @memberof common.BombWillExplodeData
         * @instance
         */
        BombWillExplodeData.prototype.bombFirepower = 0;

        /**
         * BombWillExplodeData userId.
         * @member {number} userId
         * @memberof common.BombWillExplodeData
         * @instance
         */
        BombWillExplodeData.prototype.userId = 0;

        /**
         * Creates a new BombWillExplodeData instance using the specified properties.
         * @function create
         * @memberof common.BombWillExplodeData
         * @static
         * @param {common.IBombWillExplodeData=} [properties] Properties to set
         * @returns {common.BombWillExplodeData} BombWillExplodeData instance
         */
        BombWillExplodeData.create = function create(properties) {
            return new BombWillExplodeData(properties);
        };

        /**
         * Encodes the specified BombWillExplodeData message. Does not implicitly {@link common.BombWillExplodeData.verify|verify} messages.
         * @function encode
         * @memberof common.BombWillExplodeData
         * @static
         * @param {common.IBombWillExplodeData} message BombWillExplodeData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BombWillExplodeData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.bombFirepower != null && Object.hasOwnProperty.call(message, "bombFirepower"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bombFirepower);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified BombWillExplodeData message, length delimited. Does not implicitly {@link common.BombWillExplodeData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.BombWillExplodeData
         * @static
         * @param {common.IBombWillExplodeData} message BombWillExplodeData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BombWillExplodeData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BombWillExplodeData message from the specified reader or buffer.
         * @function decode
         * @memberof common.BombWillExplodeData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.BombWillExplodeData} BombWillExplodeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BombWillExplodeData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.BombWillExplodeData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.int32();
                        break;
                    }
                case 2: {
                        message.y = reader.int32();
                        break;
                    }
                case 3: {
                        message.bombFirepower = reader.int32();
                        break;
                    }
                case 4: {
                        message.userId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BombWillExplodeData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.BombWillExplodeData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.BombWillExplodeData} BombWillExplodeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BombWillExplodeData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BombWillExplodeData message.
         * @function verify
         * @memberof common.BombWillExplodeData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BombWillExplodeData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.bombFirepower != null && message.hasOwnProperty("bombFirepower"))
                if (!$util.isInteger(message.bombFirepower))
                    return "bombFirepower: integer expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a BombWillExplodeData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.BombWillExplodeData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.BombWillExplodeData} BombWillExplodeData
         */
        BombWillExplodeData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.BombWillExplodeData)
                return object;
            let message = new $root.common.BombWillExplodeData();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.bombFirepower != null)
                message.bombFirepower = object.bombFirepower | 0;
            if (object.userId != null)
                message.userId = object.userId | 0;
            return message;
        };

        /**
         * Creates a plain object from a BombWillExplodeData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.BombWillExplodeData
         * @static
         * @param {common.BombWillExplodeData} message BombWillExplodeData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BombWillExplodeData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.bombFirepower = 0;
                object.userId = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.bombFirepower != null && message.hasOwnProperty("bombFirepower"))
                object.bombFirepower = message.bombFirepower;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this BombWillExplodeData to JSON.
         * @function toJSON
         * @memberof common.BombWillExplodeData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BombWillExplodeData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BombWillExplodeData
         * @function getTypeUrl
         * @memberof common.BombWillExplodeData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BombWillExplodeData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.BombWillExplodeData";
        };

        return BombWillExplodeData;
    })();

    common.BombExplodedData = (function() {

        /**
         * Properties of a BombExplodedData.
         * @memberof common
         * @interface IBombExplodedData
         * @property {number|null} [x] BombExplodedData x
         * @property {number|null} [y] BombExplodedData y
         * @property {number|null} [bombFirepower] BombExplodedData bombFirepower
         * @property {number|null} [userId] BombExplodedData userId
         * @property {number|null} [userBombcount] BombExplodedData userBombcount
         */

        /**
         * Constructs a new BombExplodedData.
         * @memberof common
         * @classdesc Represents a BombExplodedData.
         * @implements IBombExplodedData
         * @constructor
         * @param {common.IBombExplodedData=} [properties] Properties to set
         */
        function BombExplodedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BombExplodedData x.
         * @member {number} x
         * @memberof common.BombExplodedData
         * @instance
         */
        BombExplodedData.prototype.x = 0;

        /**
         * BombExplodedData y.
         * @member {number} y
         * @memberof common.BombExplodedData
         * @instance
         */
        BombExplodedData.prototype.y = 0;

        /**
         * BombExplodedData bombFirepower.
         * @member {number} bombFirepower
         * @memberof common.BombExplodedData
         * @instance
         */
        BombExplodedData.prototype.bombFirepower = 0;

        /**
         * BombExplodedData userId.
         * @member {number} userId
         * @memberof common.BombExplodedData
         * @instance
         */
        BombExplodedData.prototype.userId = 0;

        /**
         * BombExplodedData userBombcount.
         * @member {number} userBombcount
         * @memberof common.BombExplodedData
         * @instance
         */
        BombExplodedData.prototype.userBombcount = 0;

        /**
         * Creates a new BombExplodedData instance using the specified properties.
         * @function create
         * @memberof common.BombExplodedData
         * @static
         * @param {common.IBombExplodedData=} [properties] Properties to set
         * @returns {common.BombExplodedData} BombExplodedData instance
         */
        BombExplodedData.create = function create(properties) {
            return new BombExplodedData(properties);
        };

        /**
         * Encodes the specified BombExplodedData message. Does not implicitly {@link common.BombExplodedData.verify|verify} messages.
         * @function encode
         * @memberof common.BombExplodedData
         * @static
         * @param {common.IBombExplodedData} message BombExplodedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BombExplodedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.bombFirepower != null && Object.hasOwnProperty.call(message, "bombFirepower"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.bombFirepower);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.userId);
            if (message.userBombcount != null && Object.hasOwnProperty.call(message, "userBombcount"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.userBombcount);
            return writer;
        };

        /**
         * Encodes the specified BombExplodedData message, length delimited. Does not implicitly {@link common.BombExplodedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.BombExplodedData
         * @static
         * @param {common.IBombExplodedData} message BombExplodedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BombExplodedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BombExplodedData message from the specified reader or buffer.
         * @function decode
         * @memberof common.BombExplodedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.BombExplodedData} BombExplodedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BombExplodedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.BombExplodedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.int32();
                        break;
                    }
                case 2: {
                        message.y = reader.int32();
                        break;
                    }
                case 3: {
                        message.bombFirepower = reader.int32();
                        break;
                    }
                case 4: {
                        message.userId = reader.int32();
                        break;
                    }
                case 5: {
                        message.userBombcount = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BombExplodedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.BombExplodedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.BombExplodedData} BombExplodedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BombExplodedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BombExplodedData message.
         * @function verify
         * @memberof common.BombExplodedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BombExplodedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.bombFirepower != null && message.hasOwnProperty("bombFirepower"))
                if (!$util.isInteger(message.bombFirepower))
                    return "bombFirepower: integer expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.userBombcount != null && message.hasOwnProperty("userBombcount"))
                if (!$util.isInteger(message.userBombcount))
                    return "userBombcount: integer expected";
            return null;
        };

        /**
         * Creates a BombExplodedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.BombExplodedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.BombExplodedData} BombExplodedData
         */
        BombExplodedData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.BombExplodedData)
                return object;
            let message = new $root.common.BombExplodedData();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.bombFirepower != null)
                message.bombFirepower = object.bombFirepower | 0;
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.userBombcount != null)
                message.userBombcount = object.userBombcount | 0;
            return message;
        };

        /**
         * Creates a plain object from a BombExplodedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.BombExplodedData
         * @static
         * @param {common.BombExplodedData} message BombExplodedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BombExplodedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.bombFirepower = 0;
                object.userId = 0;
                object.userBombcount = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.bombFirepower != null && message.hasOwnProperty("bombFirepower"))
                object.bombFirepower = message.bombFirepower;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userBombcount != null && message.hasOwnProperty("userBombcount"))
                object.userBombcount = message.userBombcount;
            return object;
        };

        /**
         * Converts this BombExplodedData to JSON.
         * @function toJSON
         * @memberof common.BombExplodedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BombExplodedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BombExplodedData
         * @function getTypeUrl
         * @memberof common.BombExplodedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BombExplodedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.BombExplodedData";
        };

        return BombExplodedData;
    })();

    common.BoxRemovedData = (function() {

        /**
         * Properties of a BoxRemovedData.
         * @memberof common
         * @interface IBoxRemovedData
         * @property {number|null} [x] BoxRemovedData x
         * @property {number|null} [y] BoxRemovedData y
         */

        /**
         * Constructs a new BoxRemovedData.
         * @memberof common
         * @classdesc Represents a BoxRemovedData.
         * @implements IBoxRemovedData
         * @constructor
         * @param {common.IBoxRemovedData=} [properties] Properties to set
         */
        function BoxRemovedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoxRemovedData x.
         * @member {number} x
         * @memberof common.BoxRemovedData
         * @instance
         */
        BoxRemovedData.prototype.x = 0;

        /**
         * BoxRemovedData y.
         * @member {number} y
         * @memberof common.BoxRemovedData
         * @instance
         */
        BoxRemovedData.prototype.y = 0;

        /**
         * Creates a new BoxRemovedData instance using the specified properties.
         * @function create
         * @memberof common.BoxRemovedData
         * @static
         * @param {common.IBoxRemovedData=} [properties] Properties to set
         * @returns {common.BoxRemovedData} BoxRemovedData instance
         */
        BoxRemovedData.create = function create(properties) {
            return new BoxRemovedData(properties);
        };

        /**
         * Encodes the specified BoxRemovedData message. Does not implicitly {@link common.BoxRemovedData.verify|verify} messages.
         * @function encode
         * @memberof common.BoxRemovedData
         * @static
         * @param {common.IBoxRemovedData} message BoxRemovedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoxRemovedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            return writer;
        };

        /**
         * Encodes the specified BoxRemovedData message, length delimited. Does not implicitly {@link common.BoxRemovedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.BoxRemovedData
         * @static
         * @param {common.IBoxRemovedData} message BoxRemovedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoxRemovedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoxRemovedData message from the specified reader or buffer.
         * @function decode
         * @memberof common.BoxRemovedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.BoxRemovedData} BoxRemovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoxRemovedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.BoxRemovedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.int32();
                        break;
                    }
                case 2: {
                        message.y = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoxRemovedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.BoxRemovedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.BoxRemovedData} BoxRemovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoxRemovedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoxRemovedData message.
         * @function verify
         * @memberof common.BoxRemovedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoxRemovedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };

        /**
         * Creates a BoxRemovedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.BoxRemovedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.BoxRemovedData} BoxRemovedData
         */
        BoxRemovedData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.BoxRemovedData)
                return object;
            let message = new $root.common.BoxRemovedData();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            return message;
        };

        /**
         * Creates a plain object from a BoxRemovedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.BoxRemovedData
         * @static
         * @param {common.BoxRemovedData} message BoxRemovedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoxRemovedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            return object;
        };

        /**
         * Converts this BoxRemovedData to JSON.
         * @function toJSON
         * @memberof common.BoxRemovedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoxRemovedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BoxRemovedData
         * @function getTypeUrl
         * @memberof common.BoxRemovedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BoxRemovedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.BoxRemovedData";
        };

        return BoxRemovedData;
    })();

    common.PowerupDroppedData = (function() {

        /**
         * Properties of a PowerupDroppedData.
         * @memberof common
         * @interface IPowerupDroppedData
         * @property {number|null} [x] PowerupDroppedData x
         * @property {number|null} [y] PowerupDroppedData y
         * @property {common.PowerupType|null} [type] PowerupDroppedData type
         */

        /**
         * Constructs a new PowerupDroppedData.
         * @memberof common
         * @classdesc Represents a PowerupDroppedData.
         * @implements IPowerupDroppedData
         * @constructor
         * @param {common.IPowerupDroppedData=} [properties] Properties to set
         */
        function PowerupDroppedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PowerupDroppedData x.
         * @member {number} x
         * @memberof common.PowerupDroppedData
         * @instance
         */
        PowerupDroppedData.prototype.x = 0;

        /**
         * PowerupDroppedData y.
         * @member {number} y
         * @memberof common.PowerupDroppedData
         * @instance
         */
        PowerupDroppedData.prototype.y = 0;

        /**
         * PowerupDroppedData type.
         * @member {common.PowerupType} type
         * @memberof common.PowerupDroppedData
         * @instance
         */
        PowerupDroppedData.prototype.type = 0;

        /**
         * Creates a new PowerupDroppedData instance using the specified properties.
         * @function create
         * @memberof common.PowerupDroppedData
         * @static
         * @param {common.IPowerupDroppedData=} [properties] Properties to set
         * @returns {common.PowerupDroppedData} PowerupDroppedData instance
         */
        PowerupDroppedData.create = function create(properties) {
            return new PowerupDroppedData(properties);
        };

        /**
         * Encodes the specified PowerupDroppedData message. Does not implicitly {@link common.PowerupDroppedData.verify|verify} messages.
         * @function encode
         * @memberof common.PowerupDroppedData
         * @static
         * @param {common.IPowerupDroppedData} message PowerupDroppedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerupDroppedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified PowerupDroppedData message, length delimited. Does not implicitly {@link common.PowerupDroppedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PowerupDroppedData
         * @static
         * @param {common.IPowerupDroppedData} message PowerupDroppedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerupDroppedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PowerupDroppedData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PowerupDroppedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PowerupDroppedData} PowerupDroppedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerupDroppedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PowerupDroppedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.int32();
                        break;
                    }
                case 2: {
                        message.y = reader.int32();
                        break;
                    }
                case 3: {
                        message.type = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PowerupDroppedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PowerupDroppedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PowerupDroppedData} PowerupDroppedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerupDroppedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PowerupDroppedData message.
         * @function verify
         * @memberof common.PowerupDroppedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PowerupDroppedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates a PowerupDroppedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PowerupDroppedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PowerupDroppedData} PowerupDroppedData
         */
        PowerupDroppedData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PowerupDroppedData)
                return object;
            let message = new $root.common.PowerupDroppedData();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "MoreBomb":
            case 0:
                message.type = 0;
                break;
            case "MoreFire":
            case 1:
                message.type = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a PowerupDroppedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PowerupDroppedData
         * @static
         * @param {common.PowerupDroppedData} message PowerupDroppedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PowerupDroppedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.type = options.enums === String ? "MoreBomb" : 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.common.PowerupType[message.type] === undefined ? message.type : $root.common.PowerupType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this PowerupDroppedData to JSON.
         * @function toJSON
         * @memberof common.PowerupDroppedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PowerupDroppedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PowerupDroppedData
         * @function getTypeUrl
         * @memberof common.PowerupDroppedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PowerupDroppedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PowerupDroppedData";
        };

        return PowerupDroppedData;
    })();

    common.PowerupConsumedData = (function() {

        /**
         * Properties of a PowerupConsumedData.
         * @memberof common
         * @interface IPowerupConsumedData
         * @property {number|null} [userId] PowerupConsumedData userId
         * @property {number|null} [x] PowerupConsumedData x
         * @property {number|null} [y] PowerupConsumedData y
         * @property {common.PowerupType|null} [type] PowerupConsumedData type
         * @property {number|null} [userBombcount] PowerupConsumedData userBombcount
         * @property {number|null} [userFirepower] PowerupConsumedData userFirepower
         */

        /**
         * Constructs a new PowerupConsumedData.
         * @memberof common
         * @classdesc Represents a PowerupConsumedData.
         * @implements IPowerupConsumedData
         * @constructor
         * @param {common.IPowerupConsumedData=} [properties] Properties to set
         */
        function PowerupConsumedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PowerupConsumedData userId.
         * @member {number} userId
         * @memberof common.PowerupConsumedData
         * @instance
         */
        PowerupConsumedData.prototype.userId = 0;

        /**
         * PowerupConsumedData x.
         * @member {number} x
         * @memberof common.PowerupConsumedData
         * @instance
         */
        PowerupConsumedData.prototype.x = 0;

        /**
         * PowerupConsumedData y.
         * @member {number} y
         * @memberof common.PowerupConsumedData
         * @instance
         */
        PowerupConsumedData.prototype.y = 0;

        /**
         * PowerupConsumedData type.
         * @member {common.PowerupType} type
         * @memberof common.PowerupConsumedData
         * @instance
         */
        PowerupConsumedData.prototype.type = 0;

        /**
         * PowerupConsumedData userBombcount.
         * @member {number} userBombcount
         * @memberof common.PowerupConsumedData
         * @instance
         */
        PowerupConsumedData.prototype.userBombcount = 0;

        /**
         * PowerupConsumedData userFirepower.
         * @member {number} userFirepower
         * @memberof common.PowerupConsumedData
         * @instance
         */
        PowerupConsumedData.prototype.userFirepower = 0;

        /**
         * Creates a new PowerupConsumedData instance using the specified properties.
         * @function create
         * @memberof common.PowerupConsumedData
         * @static
         * @param {common.IPowerupConsumedData=} [properties] Properties to set
         * @returns {common.PowerupConsumedData} PowerupConsumedData instance
         */
        PowerupConsumedData.create = function create(properties) {
            return new PowerupConsumedData(properties);
        };

        /**
         * Encodes the specified PowerupConsumedData message. Does not implicitly {@link common.PowerupConsumedData.verify|verify} messages.
         * @function encode
         * @memberof common.PowerupConsumedData
         * @static
         * @param {common.IPowerupConsumedData} message PowerupConsumedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerupConsumedData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.type);
            if (message.userBombcount != null && Object.hasOwnProperty.call(message, "userBombcount"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.userBombcount);
            if (message.userFirepower != null && Object.hasOwnProperty.call(message, "userFirepower"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.userFirepower);
            return writer;
        };

        /**
         * Encodes the specified PowerupConsumedData message, length delimited. Does not implicitly {@link common.PowerupConsumedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PowerupConsumedData
         * @static
         * @param {common.IPowerupConsumedData} message PowerupConsumedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerupConsumedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PowerupConsumedData message from the specified reader or buffer.
         * @function decode
         * @memberof common.PowerupConsumedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PowerupConsumedData} PowerupConsumedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerupConsumedData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PowerupConsumedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.x = reader.int32();
                        break;
                    }
                case 3: {
                        message.y = reader.int32();
                        break;
                    }
                case 4: {
                        message.type = reader.int32();
                        break;
                    }
                case 5: {
                        message.userBombcount = reader.int32();
                        break;
                    }
                case 6: {
                        message.userFirepower = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PowerupConsumedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PowerupConsumedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PowerupConsumedData} PowerupConsumedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerupConsumedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PowerupConsumedData message.
         * @function verify
         * @memberof common.PowerupConsumedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PowerupConsumedData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.userBombcount != null && message.hasOwnProperty("userBombcount"))
                if (!$util.isInteger(message.userBombcount))
                    return "userBombcount: integer expected";
            if (message.userFirepower != null && message.hasOwnProperty("userFirepower"))
                if (!$util.isInteger(message.userFirepower))
                    return "userFirepower: integer expected";
            return null;
        };

        /**
         * Creates a PowerupConsumedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PowerupConsumedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PowerupConsumedData} PowerupConsumedData
         */
        PowerupConsumedData.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PowerupConsumedData)
                return object;
            let message = new $root.common.PowerupConsumedData();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "MoreBomb":
            case 0:
                message.type = 0;
                break;
            case "MoreFire":
            case 1:
                message.type = 1;
                break;
            }
            if (object.userBombcount != null)
                message.userBombcount = object.userBombcount | 0;
            if (object.userFirepower != null)
                message.userFirepower = object.userFirepower | 0;
            return message;
        };

        /**
         * Creates a plain object from a PowerupConsumedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PowerupConsumedData
         * @static
         * @param {common.PowerupConsumedData} message PowerupConsumedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PowerupConsumedData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.x = 0;
                object.y = 0;
                object.type = options.enums === String ? "MoreBomb" : 0;
                object.userBombcount = 0;
                object.userFirepower = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.common.PowerupType[message.type] === undefined ? message.type : $root.common.PowerupType[message.type] : message.type;
            if (message.userBombcount != null && message.hasOwnProperty("userBombcount"))
                object.userBombcount = message.userBombcount;
            if (message.userFirepower != null && message.hasOwnProperty("userFirepower"))
                object.userFirepower = message.userFirepower;
            return object;
        };

        /**
         * Converts this PowerupConsumedData to JSON.
         * @function toJSON
         * @memberof common.PowerupConsumedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PowerupConsumedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PowerupConsumedData
         * @function getTypeUrl
         * @memberof common.PowerupConsumedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PowerupConsumedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PowerupConsumedData";
        };

        return PowerupConsumedData;
    })();

    common.PlayerPropertyDto = (function() {

        /**
         * Properties of a PlayerPropertyDto.
         * @memberof common
         * @interface IPlayerPropertyDto
         * @property {number|null} [userId] PlayerPropertyDto userId
         * @property {number|null} [x] PlayerPropertyDto x
         * @property {number|null} [y] PlayerPropertyDto y
         * @property {number|null} [firepower] PlayerPropertyDto firepower
         * @property {number|null} [bombcount] PlayerPropertyDto bombcount
         */

        /**
         * Constructs a new PlayerPropertyDto.
         * @memberof common
         * @classdesc Represents a PlayerPropertyDto.
         * @implements IPlayerPropertyDto
         * @constructor
         * @param {common.IPlayerPropertyDto=} [properties] Properties to set
         */
        function PlayerPropertyDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerPropertyDto userId.
         * @member {number} userId
         * @memberof common.PlayerPropertyDto
         * @instance
         */
        PlayerPropertyDto.prototype.userId = 0;

        /**
         * PlayerPropertyDto x.
         * @member {number} x
         * @memberof common.PlayerPropertyDto
         * @instance
         */
        PlayerPropertyDto.prototype.x = 0;

        /**
         * PlayerPropertyDto y.
         * @member {number} y
         * @memberof common.PlayerPropertyDto
         * @instance
         */
        PlayerPropertyDto.prototype.y = 0;

        /**
         * PlayerPropertyDto firepower.
         * @member {number} firepower
         * @memberof common.PlayerPropertyDto
         * @instance
         */
        PlayerPropertyDto.prototype.firepower = 0;

        /**
         * PlayerPropertyDto bombcount.
         * @member {number} bombcount
         * @memberof common.PlayerPropertyDto
         * @instance
         */
        PlayerPropertyDto.prototype.bombcount = 0;

        /**
         * Creates a new PlayerPropertyDto instance using the specified properties.
         * @function create
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {common.IPlayerPropertyDto=} [properties] Properties to set
         * @returns {common.PlayerPropertyDto} PlayerPropertyDto instance
         */
        PlayerPropertyDto.create = function create(properties) {
            return new PlayerPropertyDto(properties);
        };

        /**
         * Encodes the specified PlayerPropertyDto message. Does not implicitly {@link common.PlayerPropertyDto.verify|verify} messages.
         * @function encode
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {common.IPlayerPropertyDto} message PlayerPropertyDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerPropertyDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.y);
            if (message.firepower != null && Object.hasOwnProperty.call(message, "firepower"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.firepower);
            if (message.bombcount != null && Object.hasOwnProperty.call(message, "bombcount"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.bombcount);
            return writer;
        };

        /**
         * Encodes the specified PlayerPropertyDto message, length delimited. Does not implicitly {@link common.PlayerPropertyDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {common.IPlayerPropertyDto} message PlayerPropertyDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerPropertyDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerPropertyDto message from the specified reader or buffer.
         * @function decode
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PlayerPropertyDto} PlayerPropertyDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerPropertyDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PlayerPropertyDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.x = reader.int32();
                        break;
                    }
                case 3: {
                        message.y = reader.int32();
                        break;
                    }
                case 4: {
                        message.firepower = reader.int32();
                        break;
                    }
                case 5: {
                        message.bombcount = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerPropertyDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PlayerPropertyDto} PlayerPropertyDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerPropertyDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerPropertyDto message.
         * @function verify
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerPropertyDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.firepower != null && message.hasOwnProperty("firepower"))
                if (!$util.isInteger(message.firepower))
                    return "firepower: integer expected";
            if (message.bombcount != null && message.hasOwnProperty("bombcount"))
                if (!$util.isInteger(message.bombcount))
                    return "bombcount: integer expected";
            return null;
        };

        /**
         * Creates a PlayerPropertyDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PlayerPropertyDto} PlayerPropertyDto
         */
        PlayerPropertyDto.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PlayerPropertyDto)
                return object;
            let message = new $root.common.PlayerPropertyDto();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            if (object.firepower != null)
                message.firepower = object.firepower | 0;
            if (object.bombcount != null)
                message.bombcount = object.bombcount | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerPropertyDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {common.PlayerPropertyDto} message PlayerPropertyDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerPropertyDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.x = 0;
                object.y = 0;
                object.firepower = 0;
                object.bombcount = 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.firepower != null && message.hasOwnProperty("firepower"))
                object.firepower = message.firepower;
            if (message.bombcount != null && message.hasOwnProperty("bombcount"))
                object.bombcount = message.bombcount;
            return object;
        };

        /**
         * Converts this PlayerPropertyDto to JSON.
         * @function toJSON
         * @memberof common.PlayerPropertyDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerPropertyDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerPropertyDto
         * @function getTypeUrl
         * @memberof common.PlayerPropertyDto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerPropertyDto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PlayerPropertyDto";
        };

        return PlayerPropertyDto;
    })();

    common.TileDto = (function() {

        /**
         * Properties of a TileDto.
         * @memberof common
         * @interface ITileDto
         * @property {common.IObstacleDto|null} [obstacle] TileDto obstacle
         * @property {common.IDecorationDto|null} [decoration] TileDto decoration
         * @property {common.IPowerupDto|null} [powerup] TileDto powerup
         */

        /**
         * Constructs a new TileDto.
         * @memberof common
         * @classdesc Represents a TileDto.
         * @implements ITileDto
         * @constructor
         * @param {common.ITileDto=} [properties] Properties to set
         */
        function TileDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TileDto obstacle.
         * @member {common.IObstacleDto|null|undefined} obstacle
         * @memberof common.TileDto
         * @instance
         */
        TileDto.prototype.obstacle = null;

        /**
         * TileDto decoration.
         * @member {common.IDecorationDto|null|undefined} decoration
         * @memberof common.TileDto
         * @instance
         */
        TileDto.prototype.decoration = null;

        /**
         * TileDto powerup.
         * @member {common.IPowerupDto|null|undefined} powerup
         * @memberof common.TileDto
         * @instance
         */
        TileDto.prototype.powerup = null;

        /**
         * Creates a new TileDto instance using the specified properties.
         * @function create
         * @memberof common.TileDto
         * @static
         * @param {common.ITileDto=} [properties] Properties to set
         * @returns {common.TileDto} TileDto instance
         */
        TileDto.create = function create(properties) {
            return new TileDto(properties);
        };

        /**
         * Encodes the specified TileDto message. Does not implicitly {@link common.TileDto.verify|verify} messages.
         * @function encode
         * @memberof common.TileDto
         * @static
         * @param {common.ITileDto} message TileDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TileDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.obstacle != null && Object.hasOwnProperty.call(message, "obstacle"))
                $root.common.ObstacleDto.encode(message.obstacle, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.decoration != null && Object.hasOwnProperty.call(message, "decoration"))
                $root.common.DecorationDto.encode(message.decoration, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.powerup != null && Object.hasOwnProperty.call(message, "powerup"))
                $root.common.PowerupDto.encode(message.powerup, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TileDto message, length delimited. Does not implicitly {@link common.TileDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.TileDto
         * @static
         * @param {common.ITileDto} message TileDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TileDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TileDto message from the specified reader or buffer.
         * @function decode
         * @memberof common.TileDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.TileDto} TileDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TileDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.TileDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.obstacle = $root.common.ObstacleDto.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.decoration = $root.common.DecorationDto.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.powerup = $root.common.PowerupDto.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TileDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.TileDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.TileDto} TileDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TileDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TileDto message.
         * @function verify
         * @memberof common.TileDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TileDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.obstacle != null && message.hasOwnProperty("obstacle")) {
                let error = $root.common.ObstacleDto.verify(message.obstacle);
                if (error)
                    return "obstacle." + error;
            }
            if (message.decoration != null && message.hasOwnProperty("decoration")) {
                let error = $root.common.DecorationDto.verify(message.decoration);
                if (error)
                    return "decoration." + error;
            }
            if (message.powerup != null && message.hasOwnProperty("powerup")) {
                let error = $root.common.PowerupDto.verify(message.powerup);
                if (error)
                    return "powerup." + error;
            }
            return null;
        };

        /**
         * Creates a TileDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.TileDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.TileDto} TileDto
         */
        TileDto.fromObject = function fromObject(object) {
            if (object instanceof $root.common.TileDto)
                return object;
            let message = new $root.common.TileDto();
            if (object.obstacle != null) {
                if (typeof object.obstacle !== "object")
                    throw TypeError(".common.TileDto.obstacle: object expected");
                message.obstacle = $root.common.ObstacleDto.fromObject(object.obstacle);
            }
            if (object.decoration != null) {
                if (typeof object.decoration !== "object")
                    throw TypeError(".common.TileDto.decoration: object expected");
                message.decoration = $root.common.DecorationDto.fromObject(object.decoration);
            }
            if (object.powerup != null) {
                if (typeof object.powerup !== "object")
                    throw TypeError(".common.TileDto.powerup: object expected");
                message.powerup = $root.common.PowerupDto.fromObject(object.powerup);
            }
            return message;
        };

        /**
         * Creates a plain object from a TileDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.TileDto
         * @static
         * @param {common.TileDto} message TileDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TileDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.obstacle = null;
                object.decoration = null;
                object.powerup = null;
            }
            if (message.obstacle != null && message.hasOwnProperty("obstacle"))
                object.obstacle = $root.common.ObstacleDto.toObject(message.obstacle, options);
            if (message.decoration != null && message.hasOwnProperty("decoration"))
                object.decoration = $root.common.DecorationDto.toObject(message.decoration, options);
            if (message.powerup != null && message.hasOwnProperty("powerup"))
                object.powerup = $root.common.PowerupDto.toObject(message.powerup, options);
            return object;
        };

        /**
         * Converts this TileDto to JSON.
         * @function toJSON
         * @memberof common.TileDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TileDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TileDto
         * @function getTypeUrl
         * @memberof common.TileDto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TileDto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.TileDto";
        };

        return TileDto;
    })();

    common.ObstacleDto = (function() {

        /**
         * Properties of an ObstacleDto.
         * @memberof common
         * @interface IObstacleDto
         * @property {common.ObstacleType|null} [type] ObstacleDto type
         */

        /**
         * Constructs a new ObstacleDto.
         * @memberof common
         * @classdesc Represents an ObstacleDto.
         * @implements IObstacleDto
         * @constructor
         * @param {common.IObstacleDto=} [properties] Properties to set
         */
        function ObstacleDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObstacleDto type.
         * @member {common.ObstacleType} type
         * @memberof common.ObstacleDto
         * @instance
         */
        ObstacleDto.prototype.type = 0;

        /**
         * Creates a new ObstacleDto instance using the specified properties.
         * @function create
         * @memberof common.ObstacleDto
         * @static
         * @param {common.IObstacleDto=} [properties] Properties to set
         * @returns {common.ObstacleDto} ObstacleDto instance
         */
        ObstacleDto.create = function create(properties) {
            return new ObstacleDto(properties);
        };

        /**
         * Encodes the specified ObstacleDto message. Does not implicitly {@link common.ObstacleDto.verify|verify} messages.
         * @function encode
         * @memberof common.ObstacleDto
         * @static
         * @param {common.IObstacleDto} message ObstacleDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObstacleDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified ObstacleDto message, length delimited. Does not implicitly {@link common.ObstacleDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.ObstacleDto
         * @static
         * @param {common.IObstacleDto} message ObstacleDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObstacleDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObstacleDto message from the specified reader or buffer.
         * @function decode
         * @memberof common.ObstacleDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.ObstacleDto} ObstacleDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObstacleDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.ObstacleDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObstacleDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.ObstacleDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.ObstacleDto} ObstacleDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObstacleDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObstacleDto message.
         * @function verify
         * @memberof common.ObstacleDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObstacleDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates an ObstacleDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.ObstacleDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.ObstacleDto} ObstacleDto
         */
        ObstacleDto.fromObject = function fromObject(object) {
            if (object instanceof $root.common.ObstacleDto)
                return object;
            let message = new $root.common.ObstacleDto();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "Box":
            case 0:
                message.type = 0;
                break;
            case "House":
            case 1:
                message.type = 1;
                break;
            case "Tree":
            case 2:
                message.type = 2;
                break;
            case "Bomb":
            case 3:
                message.type = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ObstacleDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.ObstacleDto
         * @static
         * @param {common.ObstacleDto} message ObstacleDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObstacleDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = options.enums === String ? "Box" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.common.ObstacleType[message.type] === undefined ? message.type : $root.common.ObstacleType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this ObstacleDto to JSON.
         * @function toJSON
         * @memberof common.ObstacleDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObstacleDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ObstacleDto
         * @function getTypeUrl
         * @memberof common.ObstacleDto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ObstacleDto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.ObstacleDto";
        };

        return ObstacleDto;
    })();

    common.DecorationDto = (function() {

        /**
         * Properties of a DecorationDto.
         * @memberof common
         * @interface IDecorationDto
         * @property {common.DecorationType|null} [type] DecorationDto type
         */

        /**
         * Constructs a new DecorationDto.
         * @memberof common
         * @classdesc Represents a DecorationDto.
         * @implements IDecorationDto
         * @constructor
         * @param {common.IDecorationDto=} [properties] Properties to set
         */
        function DecorationDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DecorationDto type.
         * @member {common.DecorationType} type
         * @memberof common.DecorationDto
         * @instance
         */
        DecorationDto.prototype.type = 0;

        /**
         * Creates a new DecorationDto instance using the specified properties.
         * @function create
         * @memberof common.DecorationDto
         * @static
         * @param {common.IDecorationDto=} [properties] Properties to set
         * @returns {common.DecorationDto} DecorationDto instance
         */
        DecorationDto.create = function create(properties) {
            return new DecorationDto(properties);
        };

        /**
         * Encodes the specified DecorationDto message. Does not implicitly {@link common.DecorationDto.verify|verify} messages.
         * @function encode
         * @memberof common.DecorationDto
         * @static
         * @param {common.IDecorationDto} message DecorationDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecorationDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified DecorationDto message, length delimited. Does not implicitly {@link common.DecorationDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.DecorationDto
         * @static
         * @param {common.IDecorationDto} message DecorationDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecorationDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DecorationDto message from the specified reader or buffer.
         * @function decode
         * @memberof common.DecorationDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.DecorationDto} DecorationDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecorationDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.DecorationDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DecorationDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.DecorationDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.DecorationDto} DecorationDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecorationDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DecorationDto message.
         * @function verify
         * @memberof common.DecorationDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DecorationDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                    break;
                }
            return null;
        };

        /**
         * Creates a DecorationDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.DecorationDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.DecorationDto} DecorationDto
         */
        DecorationDto.fromObject = function fromObject(object) {
            if (object instanceof $root.common.DecorationDto)
                return object;
            let message = new $root.common.DecorationDto();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "Bush":
            case 0:
                message.type = 0;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a DecorationDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.DecorationDto
         * @static
         * @param {common.DecorationDto} message DecorationDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DecorationDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = options.enums === String ? "Bush" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.common.DecorationType[message.type] === undefined ? message.type : $root.common.DecorationType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this DecorationDto to JSON.
         * @function toJSON
         * @memberof common.DecorationDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DecorationDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DecorationDto
         * @function getTypeUrl
         * @memberof common.DecorationDto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DecorationDto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.DecorationDto";
        };

        return DecorationDto;
    })();

    common.PowerupDto = (function() {

        /**
         * Properties of a PowerupDto.
         * @memberof common
         * @interface IPowerupDto
         * @property {common.PowerupType|null} [type] PowerupDto type
         */

        /**
         * Constructs a new PowerupDto.
         * @memberof common
         * @classdesc Represents a PowerupDto.
         * @implements IPowerupDto
         * @constructor
         * @param {common.IPowerupDto=} [properties] Properties to set
         */
        function PowerupDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PowerupDto type.
         * @member {common.PowerupType} type
         * @memberof common.PowerupDto
         * @instance
         */
        PowerupDto.prototype.type = 0;

        /**
         * Creates a new PowerupDto instance using the specified properties.
         * @function create
         * @memberof common.PowerupDto
         * @static
         * @param {common.IPowerupDto=} [properties] Properties to set
         * @returns {common.PowerupDto} PowerupDto instance
         */
        PowerupDto.create = function create(properties) {
            return new PowerupDto(properties);
        };

        /**
         * Encodes the specified PowerupDto message. Does not implicitly {@link common.PowerupDto.verify|verify} messages.
         * @function encode
         * @memberof common.PowerupDto
         * @static
         * @param {common.IPowerupDto} message PowerupDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerupDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified PowerupDto message, length delimited. Does not implicitly {@link common.PowerupDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.PowerupDto
         * @static
         * @param {common.IPowerupDto} message PowerupDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PowerupDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PowerupDto message from the specified reader or buffer.
         * @function decode
         * @memberof common.PowerupDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.PowerupDto} PowerupDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerupDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.PowerupDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PowerupDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.PowerupDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.PowerupDto} PowerupDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PowerupDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PowerupDto message.
         * @function verify
         * @memberof common.PowerupDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PowerupDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates a PowerupDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.PowerupDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.PowerupDto} PowerupDto
         */
        PowerupDto.fromObject = function fromObject(object) {
            if (object instanceof $root.common.PowerupDto)
                return object;
            let message = new $root.common.PowerupDto();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "MoreBomb":
            case 0:
                message.type = 0;
                break;
            case "MoreFire":
            case 1:
                message.type = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a PowerupDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.PowerupDto
         * @static
         * @param {common.PowerupDto} message PowerupDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PowerupDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = options.enums === String ? "MoreBomb" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.common.PowerupType[message.type] === undefined ? message.type : $root.common.PowerupType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this PowerupDto to JSON.
         * @function toJSON
         * @memberof common.PowerupDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PowerupDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PowerupDto
         * @function getTypeUrl
         * @memberof common.PowerupDto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PowerupDto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.PowerupDto";
        };

        return PowerupDto;
    })();

    /**
     * ObstacleType enum.
     * @name common.ObstacleType
     * @enum {number}
     * @property {number} Box=0 Box value
     * @property {number} House=1 House value
     * @property {number} Tree=2 Tree value
     * @property {number} Bomb=3 Bomb value
     */
    common.ObstacleType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Box"] = 0;
        values[valuesById[1] = "House"] = 1;
        values[valuesById[2] = "Tree"] = 2;
        values[valuesById[3] = "Bomb"] = 3;
        return values;
    })();

    /**
     * DecorationType enum.
     * @name common.DecorationType
     * @enum {number}
     * @property {number} Bush=0 Bush value
     */
    common.DecorationType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Bush"] = 0;
        return values;
    })();

    /**
     * PowerupType enum.
     * @name common.PowerupType
     * @enum {number}
     * @property {number} MoreBomb=0 MoreBomb value
     * @property {number} MoreFire=1 MoreFire value
     */
    common.PowerupType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "MoreBomb"] = 0;
        values[valuesById[1] = "MoreFire"] = 1;
        return values;
    })();

    return common;
})();

export const auth = $root.auth = (() => {

    /**
     * Namespace auth.
     * @exports auth
     * @namespace
     */
    const auth = {};

    auth.AuthService = (function() {

        /**
         * Constructs a new AuthService service.
         * @memberof auth
         * @classdesc Represents an AuthService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function AuthService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (AuthService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AuthService;

        /**
         * Creates new AuthService service using the specified rpc implementation.
         * @function create
         * @memberof auth.AuthService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {AuthService} RPC service. Useful where requests and/or responses are streamed.
         */
        AuthService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link auth.AuthService#register}.
         * @memberof auth.AuthService
         * @typedef RegisterCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {auth.RegisterResponse} [response] RegisterResponse
         */

        /**
         * Calls Register.
         * @function register
         * @memberof auth.AuthService
         * @instance
         * @param {auth.IRegisterRequest} request RegisterRequest message or plain object
         * @param {auth.AuthService.RegisterCallback} callback Node-style callback called with the error, if any, and RegisterResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(AuthService.prototype.register = function register(request, callback) {
            return this.rpcCall(register, $root.auth.RegisterRequest, $root.auth.RegisterResponse, request, callback);
        }, "name", { value: "Register" });

        /**
         * Calls Register.
         * @function register
         * @memberof auth.AuthService
         * @instance
         * @param {auth.IRegisterRequest} request RegisterRequest message or plain object
         * @returns {Promise<auth.RegisterResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link auth.AuthService#validate}.
         * @memberof auth.AuthService
         * @typedef ValidateCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {auth.PlayerInfoDto} [response] PlayerInfoDto
         */

        /**
         * Calls Validate.
         * @function validate
         * @memberof auth.AuthService
         * @instance
         * @param {auth.IValidateRequest} request ValidateRequest message or plain object
         * @param {auth.AuthService.ValidateCallback} callback Node-style callback called with the error, if any, and PlayerInfoDto
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(AuthService.prototype.validate = function validate(request, callback) {
            return this.rpcCall(validate, $root.auth.ValidateRequest, $root.auth.PlayerInfoDto, request, callback);
        }, "name", { value: "Validate" });

        /**
         * Calls Validate.
         * @function validate
         * @memberof auth.AuthService
         * @instance
         * @param {auth.IValidateRequest} request ValidateRequest message or plain object
         * @returns {Promise<auth.PlayerInfoDto>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link auth.AuthService#getNickname}.
         * @memberof auth.AuthService
         * @typedef GetNicknameCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {auth.GetNicknameResponse} [response] GetNicknameResponse
         */

        /**
         * Calls GetNickname.
         * @function getNickname
         * @memberof auth.AuthService
         * @instance
         * @param {auth.IGetNicknameRequest} request GetNicknameRequest message or plain object
         * @param {auth.AuthService.GetNicknameCallback} callback Node-style callback called with the error, if any, and GetNicknameResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(AuthService.prototype.getNickname = function getNickname(request, callback) {
            return this.rpcCall(getNickname, $root.auth.GetNicknameRequest, $root.auth.GetNicknameResponse, request, callback);
        }, "name", { value: "GetNickname" });

        /**
         * Calls GetNickname.
         * @function getNickname
         * @memberof auth.AuthService
         * @instance
         * @param {auth.IGetNicknameRequest} request GetNicknameRequest message or plain object
         * @returns {Promise<auth.GetNicknameResponse>} Promise
         * @variation 2
         */

        return AuthService;
    })();

    auth.RegisterRequest = (function() {

        /**
         * Properties of a RegisterRequest.
         * @memberof auth
         * @interface IRegisterRequest
         * @property {string|null} [nickname] RegisterRequest nickname
         */

        /**
         * Constructs a new RegisterRequest.
         * @memberof auth
         * @classdesc Represents a RegisterRequest.
         * @implements IRegisterRequest
         * @constructor
         * @param {auth.IRegisterRequest=} [properties] Properties to set
         */
        function RegisterRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegisterRequest nickname.
         * @member {string} nickname
         * @memberof auth.RegisterRequest
         * @instance
         */
        RegisterRequest.prototype.nickname = "";

        /**
         * Creates a new RegisterRequest instance using the specified properties.
         * @function create
         * @memberof auth.RegisterRequest
         * @static
         * @param {auth.IRegisterRequest=} [properties] Properties to set
         * @returns {auth.RegisterRequest} RegisterRequest instance
         */
        RegisterRequest.create = function create(properties) {
            return new RegisterRequest(properties);
        };

        /**
         * Encodes the specified RegisterRequest message. Does not implicitly {@link auth.RegisterRequest.verify|verify} messages.
         * @function encode
         * @memberof auth.RegisterRequest
         * @static
         * @param {auth.IRegisterRequest} message RegisterRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link auth.RegisterRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.RegisterRequest
         * @static
         * @param {auth.IRegisterRequest} message RegisterRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer.
         * @function decode
         * @memberof auth.RegisterRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.RegisterRequest} RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.RegisterRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.RegisterRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.RegisterRequest} RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegisterRequest message.
         * @function verify
         * @memberof auth.RegisterRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegisterRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.RegisterRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.RegisterRequest} RegisterRequest
         */
        RegisterRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.RegisterRequest)
                return object;
            let message = new $root.auth.RegisterRequest();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.RegisterRequest
         * @static
         * @param {auth.RegisterRequest} message RegisterRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegisterRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.nickname = "";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this RegisterRequest to JSON.
         * @function toJSON
         * @memberof auth.RegisterRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegisterRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RegisterRequest
         * @function getTypeUrl
         * @memberof auth.RegisterRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RegisterRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/auth.RegisterRequest";
        };

        return RegisterRequest;
    })();

    auth.RegisterResponse = (function() {

        /**
         * Properties of a RegisterResponse.
         * @memberof auth
         * @interface IRegisterResponse
         * @property {string|null} [apiKey] RegisterResponse apiKey
         * @property {auth.IPlayerInfoDto|null} [player] RegisterResponse player
         */

        /**
         * Constructs a new RegisterResponse.
         * @memberof auth
         * @classdesc Represents a RegisterResponse.
         * @implements IRegisterResponse
         * @constructor
         * @param {auth.IRegisterResponse=} [properties] Properties to set
         */
        function RegisterResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegisterResponse apiKey.
         * @member {string} apiKey
         * @memberof auth.RegisterResponse
         * @instance
         */
        RegisterResponse.prototype.apiKey = "";

        /**
         * RegisterResponse player.
         * @member {auth.IPlayerInfoDto|null|undefined} player
         * @memberof auth.RegisterResponse
         * @instance
         */
        RegisterResponse.prototype.player = null;

        /**
         * Creates a new RegisterResponse instance using the specified properties.
         * @function create
         * @memberof auth.RegisterResponse
         * @static
         * @param {auth.IRegisterResponse=} [properties] Properties to set
         * @returns {auth.RegisterResponse} RegisterResponse instance
         */
        RegisterResponse.create = function create(properties) {
            return new RegisterResponse(properties);
        };

        /**
         * Encodes the specified RegisterResponse message. Does not implicitly {@link auth.RegisterResponse.verify|verify} messages.
         * @function encode
         * @memberof auth.RegisterResponse
         * @static
         * @param {auth.IRegisterResponse} message RegisterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.apiKey != null && Object.hasOwnProperty.call(message, "apiKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.apiKey);
            if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                $root.auth.PlayerInfoDto.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link auth.RegisterResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.RegisterResponse
         * @static
         * @param {auth.IRegisterResponse} message RegisterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer.
         * @function decode
         * @memberof auth.RegisterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.RegisterResponse} RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.RegisterResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.apiKey = reader.string();
                        break;
                    }
                case 2: {
                        message.player = $root.auth.PlayerInfoDto.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.RegisterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.RegisterResponse} RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegisterResponse message.
         * @function verify
         * @memberof auth.RegisterResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegisterResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                if (!$util.isString(message.apiKey))
                    return "apiKey: string expected";
            if (message.player != null && message.hasOwnProperty("player")) {
                let error = $root.auth.PlayerInfoDto.verify(message.player);
                if (error)
                    return "player." + error;
            }
            return null;
        };

        /**
         * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.RegisterResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.RegisterResponse} RegisterResponse
         */
        RegisterResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.RegisterResponse)
                return object;
            let message = new $root.auth.RegisterResponse();
            if (object.apiKey != null)
                message.apiKey = String(object.apiKey);
            if (object.player != null) {
                if (typeof object.player !== "object")
                    throw TypeError(".auth.RegisterResponse.player: object expected");
                message.player = $root.auth.PlayerInfoDto.fromObject(object.player);
            }
            return message;
        };

        /**
         * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.RegisterResponse
         * @static
         * @param {auth.RegisterResponse} message RegisterResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegisterResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.apiKey = "";
                object.player = null;
            }
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                object.apiKey = message.apiKey;
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = $root.auth.PlayerInfoDto.toObject(message.player, options);
            return object;
        };

        /**
         * Converts this RegisterResponse to JSON.
         * @function toJSON
         * @memberof auth.RegisterResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegisterResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RegisterResponse
         * @function getTypeUrl
         * @memberof auth.RegisterResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RegisterResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/auth.RegisterResponse";
        };

        return RegisterResponse;
    })();

    auth.ValidateRequest = (function() {

        /**
         * Properties of a ValidateRequest.
         * @memberof auth
         * @interface IValidateRequest
         * @property {string|null} [apiKey] ValidateRequest apiKey
         */

        /**
         * Constructs a new ValidateRequest.
         * @memberof auth
         * @classdesc Represents a ValidateRequest.
         * @implements IValidateRequest
         * @constructor
         * @param {auth.IValidateRequest=} [properties] Properties to set
         */
        function ValidateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateRequest apiKey.
         * @member {string} apiKey
         * @memberof auth.ValidateRequest
         * @instance
         */
        ValidateRequest.prototype.apiKey = "";

        /**
         * Creates a new ValidateRequest instance using the specified properties.
         * @function create
         * @memberof auth.ValidateRequest
         * @static
         * @param {auth.IValidateRequest=} [properties] Properties to set
         * @returns {auth.ValidateRequest} ValidateRequest instance
         */
        ValidateRequest.create = function create(properties) {
            return new ValidateRequest(properties);
        };

        /**
         * Encodes the specified ValidateRequest message. Does not implicitly {@link auth.ValidateRequest.verify|verify} messages.
         * @function encode
         * @memberof auth.ValidateRequest
         * @static
         * @param {auth.IValidateRequest} message ValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.apiKey != null && Object.hasOwnProperty.call(message, "apiKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.apiKey);
            return writer;
        };

        /**
         * Encodes the specified ValidateRequest message, length delimited. Does not implicitly {@link auth.ValidateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.ValidateRequest
         * @static
         * @param {auth.IValidateRequest} message ValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValidateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof auth.ValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.ValidateRequest} ValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.ValidateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.apiKey = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValidateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.ValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.ValidateRequest} ValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidateRequest message.
         * @function verify
         * @memberof auth.ValidateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidateRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                if (!$util.isString(message.apiKey))
                    return "apiKey: string expected";
            return null;
        };

        /**
         * Creates a ValidateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.ValidateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.ValidateRequest} ValidateRequest
         */
        ValidateRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.ValidateRequest)
                return object;
            let message = new $root.auth.ValidateRequest();
            if (object.apiKey != null)
                message.apiKey = String(object.apiKey);
            return message;
        };

        /**
         * Creates a plain object from a ValidateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.ValidateRequest
         * @static
         * @param {auth.ValidateRequest} message ValidateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.apiKey = "";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                object.apiKey = message.apiKey;
            return object;
        };

        /**
         * Converts this ValidateRequest to JSON.
         * @function toJSON
         * @memberof auth.ValidateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateRequest
         * @function getTypeUrl
         * @memberof auth.ValidateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/auth.ValidateRequest";
        };

        return ValidateRequest;
    })();

    auth.GetNicknameRequest = (function() {

        /**
         * Properties of a GetNicknameRequest.
         * @memberof auth
         * @interface IGetNicknameRequest
         * @property {Array.<number>|null} [players] GetNicknameRequest players
         */

        /**
         * Constructs a new GetNicknameRequest.
         * @memberof auth
         * @classdesc Represents a GetNicknameRequest.
         * @implements IGetNicknameRequest
         * @constructor
         * @param {auth.IGetNicknameRequest=} [properties] Properties to set
         */
        function GetNicknameRequest(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetNicknameRequest players.
         * @member {Array.<number>} players
         * @memberof auth.GetNicknameRequest
         * @instance
         */
        GetNicknameRequest.prototype.players = $util.emptyArray;

        /**
         * Creates a new GetNicknameRequest instance using the specified properties.
         * @function create
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {auth.IGetNicknameRequest=} [properties] Properties to set
         * @returns {auth.GetNicknameRequest} GetNicknameRequest instance
         */
        GetNicknameRequest.create = function create(properties) {
            return new GetNicknameRequest(properties);
        };

        /**
         * Encodes the specified GetNicknameRequest message. Does not implicitly {@link auth.GetNicknameRequest.verify|verify} messages.
         * @function encode
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {auth.IGetNicknameRequest} message GetNicknameRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNicknameRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.players.length; ++i)
                    writer.int32(message.players[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified GetNicknameRequest message, length delimited. Does not implicitly {@link auth.GetNicknameRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {auth.IGetNicknameRequest} message GetNicknameRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNicknameRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetNicknameRequest message from the specified reader or buffer.
         * @function decode
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.GetNicknameRequest} GetNicknameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNicknameRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.GetNicknameRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.players.push(reader.int32());
                        } else
                            message.players.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetNicknameRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.GetNicknameRequest} GetNicknameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNicknameRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetNicknameRequest message.
         * @function verify
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetNicknameRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i)
                    if (!$util.isInteger(message.players[i]))
                        return "players: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a GetNicknameRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.GetNicknameRequest} GetNicknameRequest
         */
        GetNicknameRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.GetNicknameRequest)
                return object;
            let message = new $root.auth.GetNicknameRequest();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".auth.GetNicknameRequest.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i)
                    message.players[i] = object.players[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GetNicknameRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {auth.GetNicknameRequest} message GetNicknameRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetNicknameRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = message.players[j];
            }
            return object;
        };

        /**
         * Converts this GetNicknameRequest to JSON.
         * @function toJSON
         * @memberof auth.GetNicknameRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetNicknameRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetNicknameRequest
         * @function getTypeUrl
         * @memberof auth.GetNicknameRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetNicknameRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/auth.GetNicknameRequest";
        };

        return GetNicknameRequest;
    })();

    auth.GetNicknameResponse = (function() {

        /**
         * Properties of a GetNicknameResponse.
         * @memberof auth
         * @interface IGetNicknameResponse
         * @property {Array.<string>|null} [nicknames] GetNicknameResponse nicknames
         */

        /**
         * Constructs a new GetNicknameResponse.
         * @memberof auth
         * @classdesc Represents a GetNicknameResponse.
         * @implements IGetNicknameResponse
         * @constructor
         * @param {auth.IGetNicknameResponse=} [properties] Properties to set
         */
        function GetNicknameResponse(properties) {
            this.nicknames = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetNicknameResponse nicknames.
         * @member {Array.<string>} nicknames
         * @memberof auth.GetNicknameResponse
         * @instance
         */
        GetNicknameResponse.prototype.nicknames = $util.emptyArray;

        /**
         * Creates a new GetNicknameResponse instance using the specified properties.
         * @function create
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {auth.IGetNicknameResponse=} [properties] Properties to set
         * @returns {auth.GetNicknameResponse} GetNicknameResponse instance
         */
        GetNicknameResponse.create = function create(properties) {
            return new GetNicknameResponse(properties);
        };

        /**
         * Encodes the specified GetNicknameResponse message. Does not implicitly {@link auth.GetNicknameResponse.verify|verify} messages.
         * @function encode
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {auth.IGetNicknameResponse} message GetNicknameResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNicknameResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nicknames != null && message.nicknames.length)
                for (let i = 0; i < message.nicknames.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.nicknames[i]);
            return writer;
        };

        /**
         * Encodes the specified GetNicknameResponse message, length delimited. Does not implicitly {@link auth.GetNicknameResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {auth.IGetNicknameResponse} message GetNicknameResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNicknameResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetNicknameResponse message from the specified reader or buffer.
         * @function decode
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.GetNicknameResponse} GetNicknameResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNicknameResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.GetNicknameResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.nicknames && message.nicknames.length))
                            message.nicknames = [];
                        message.nicknames.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetNicknameResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.GetNicknameResponse} GetNicknameResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNicknameResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetNicknameResponse message.
         * @function verify
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetNicknameResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nicknames != null && message.hasOwnProperty("nicknames")) {
                if (!Array.isArray(message.nicknames))
                    return "nicknames: array expected";
                for (let i = 0; i < message.nicknames.length; ++i)
                    if (!$util.isString(message.nicknames[i]))
                        return "nicknames: string[] expected";
            }
            return null;
        };

        /**
         * Creates a GetNicknameResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.GetNicknameResponse} GetNicknameResponse
         */
        GetNicknameResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.GetNicknameResponse)
                return object;
            let message = new $root.auth.GetNicknameResponse();
            if (object.nicknames) {
                if (!Array.isArray(object.nicknames))
                    throw TypeError(".auth.GetNicknameResponse.nicknames: array expected");
                message.nicknames = [];
                for (let i = 0; i < object.nicknames.length; ++i)
                    message.nicknames[i] = String(object.nicknames[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetNicknameResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {auth.GetNicknameResponse} message GetNicknameResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetNicknameResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.nicknames = [];
            if (message.nicknames && message.nicknames.length) {
                object.nicknames = [];
                for (let j = 0; j < message.nicknames.length; ++j)
                    object.nicknames[j] = message.nicknames[j];
            }
            return object;
        };

        /**
         * Converts this GetNicknameResponse to JSON.
         * @function toJSON
         * @memberof auth.GetNicknameResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetNicknameResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetNicknameResponse
         * @function getTypeUrl
         * @memberof auth.GetNicknameResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetNicknameResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/auth.GetNicknameResponse";
        };

        return GetNicknameResponse;
    })();

    auth.PlayerInfoDto = (function() {

        /**
         * Properties of a PlayerInfoDto.
         * @memberof auth
         * @interface IPlayerInfoDto
         * @property {number|null} [userId] PlayerInfoDto userId
         * @property {string|null} [nickname] PlayerInfoDto nickname
         */

        /**
         * Constructs a new PlayerInfoDto.
         * @memberof auth
         * @classdesc Represents a PlayerInfoDto.
         * @implements IPlayerInfoDto
         * @constructor
         * @param {auth.IPlayerInfoDto=} [properties] Properties to set
         */
        function PlayerInfoDto(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfoDto userId.
         * @member {number} userId
         * @memberof auth.PlayerInfoDto
         * @instance
         */
        PlayerInfoDto.prototype.userId = 0;

        /**
         * PlayerInfoDto nickname.
         * @member {string} nickname
         * @memberof auth.PlayerInfoDto
         * @instance
         */
        PlayerInfoDto.prototype.nickname = "";

        /**
         * Creates a new PlayerInfoDto instance using the specified properties.
         * @function create
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {auth.IPlayerInfoDto=} [properties] Properties to set
         * @returns {auth.PlayerInfoDto} PlayerInfoDto instance
         */
        PlayerInfoDto.create = function create(properties) {
            return new PlayerInfoDto(properties);
        };

        /**
         * Encodes the specified PlayerInfoDto message. Does not implicitly {@link auth.PlayerInfoDto.verify|verify} messages.
         * @function encode
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {auth.IPlayerInfoDto} message PlayerInfoDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoDto.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfoDto message, length delimited. Does not implicitly {@link auth.PlayerInfoDto.verify|verify} messages.
         * @function encodeDelimited
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {auth.IPlayerInfoDto} message PlayerInfoDto message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoDto.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfoDto message from the specified reader or buffer.
         * @function decode
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {auth.PlayerInfoDto} PlayerInfoDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoDto.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.PlayerInfoDto();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfoDto message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {auth.PlayerInfoDto} PlayerInfoDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoDto.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfoDto message.
         * @function verify
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfoDto.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a PlayerInfoDto message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {auth.PlayerInfoDto} PlayerInfoDto
         */
        PlayerInfoDto.fromObject = function fromObject(object) {
            if (object instanceof $root.auth.PlayerInfoDto)
                return object;
            let message = new $root.auth.PlayerInfoDto();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfoDto message. Also converts values to other types if specified.
         * @function toObject
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {auth.PlayerInfoDto} message PlayerInfoDto
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfoDto.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.nickname = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this PlayerInfoDto to JSON.
         * @function toJSON
         * @memberof auth.PlayerInfoDto
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfoDto.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerInfoDto
         * @function getTypeUrl
         * @memberof auth.PlayerInfoDto
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerInfoDto.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/auth.PlayerInfoDto";
        };

        return PlayerInfoDto;
    })();

    return auth;
})();

export const matchmaking = $root.matchmaking = (() => {

    /**
     * Namespace matchmaking.
     * @exports matchmaking
     * @namespace
     */
    const matchmaking = {};

    matchmaking.MatchmakingService = (function() {

        /**
         * Constructs a new MatchmakingService service.
         * @memberof matchmaking
         * @classdesc Represents a MatchmakingService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function MatchmakingService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (MatchmakingService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MatchmakingService;

        /**
         * Creates new MatchmakingService service using the specified rpc implementation.
         * @function create
         * @memberof matchmaking.MatchmakingService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {MatchmakingService} RPC service. Useful where requests and/or responses are streamed.
         */
        MatchmakingService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#enroll}.
         * @memberof matchmaking.MatchmakingService
         * @typedef EnrollCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {google.protobuf.Empty} [response] Empty
         */

        /**
         * Calls Enroll.
         * @function enroll
         * @memberof matchmaking.MatchmakingService
         * @instance
         * @param {matchmaking.IMatchmakingRequest} request MatchmakingRequest message or plain object
         * @param {matchmaking.MatchmakingService.EnrollCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MatchmakingService.prototype.enroll = function enroll(request, callback) {
            return this.rpcCall(enroll, $root.matchmaking.MatchmakingRequest, $root.google.protobuf.Empty, request, callback);
        }, "name", { value: "Enroll" });

        /**
         * Calls Enroll.
         * @function enroll
         * @memberof matchmaking.MatchmakingService
         * @instance
         * @param {matchmaking.IMatchmakingRequest} request MatchmakingRequest message or plain object
         * @returns {Promise<google.protobuf.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#cancel}.
         * @memberof matchmaking.MatchmakingService
         * @typedef CancelCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {google.protobuf.Empty} [response] Empty
         */

        /**
         * Calls Cancel.
         * @function cancel
         * @memberof matchmaking.MatchmakingService
         * @instance
         * @param {matchmaking.IMatchmakingRequest} request MatchmakingRequest message or plain object
         * @param {matchmaking.MatchmakingService.CancelCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MatchmakingService.prototype.cancel = function cancel(request, callback) {
            return this.rpcCall(cancel, $root.matchmaking.MatchmakingRequest, $root.google.protobuf.Empty, request, callback);
        }, "name", { value: "Cancel" });

        /**
         * Calls Cancel.
         * @function cancel
         * @memberof matchmaking.MatchmakingService
         * @instance
         * @param {matchmaking.IMatchmakingRequest} request MatchmakingRequest message or plain object
         * @returns {Promise<google.protobuf.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#subscribeMatch}.
         * @memberof matchmaking.MatchmakingService
         * @typedef SubscribeMatchCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {common.Event} [response] Event
         */

        /**
         * Calls SubscribeMatch.
         * @function subscribeMatch
         * @memberof matchmaking.MatchmakingService
         * @instance
         * @param {matchmaking.IMatchmakingRequest} request MatchmakingRequest message or plain object
         * @param {matchmaking.MatchmakingService.SubscribeMatchCallback} callback Node-style callback called with the error, if any, and Event
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(MatchmakingService.prototype.subscribeMatch = function subscribeMatch(request, callback) {
            return this.rpcCall(subscribeMatch, $root.matchmaking.MatchmakingRequest, $root.common.Event, request, callback);
        }, "name", { value: "SubscribeMatch" });

        /**
         * Calls SubscribeMatch.
         * @function subscribeMatch
         * @memberof matchmaking.MatchmakingService
         * @instance
         * @param {matchmaking.IMatchmakingRequest} request MatchmakingRequest message or plain object
         * @returns {Promise<common.Event>} Promise
         * @variation 2
         */

        return MatchmakingService;
    })();

    matchmaking.MatchmakingRequest = (function() {

        /**
         * Properties of a MatchmakingRequest.
         * @memberof matchmaking
         * @interface IMatchmakingRequest
         * @property {number|null} [userId] MatchmakingRequest userId
         */

        /**
         * Constructs a new MatchmakingRequest.
         * @memberof matchmaking
         * @classdesc Represents a MatchmakingRequest.
         * @implements IMatchmakingRequest
         * @constructor
         * @param {matchmaking.IMatchmakingRequest=} [properties] Properties to set
         */
        function MatchmakingRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchmakingRequest userId.
         * @member {number} userId
         * @memberof matchmaking.MatchmakingRequest
         * @instance
         */
        MatchmakingRequest.prototype.userId = 0;

        /**
         * Creates a new MatchmakingRequest instance using the specified properties.
         * @function create
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {matchmaking.IMatchmakingRequest=} [properties] Properties to set
         * @returns {matchmaking.MatchmakingRequest} MatchmakingRequest instance
         */
        MatchmakingRequest.create = function create(properties) {
            return new MatchmakingRequest(properties);
        };

        /**
         * Encodes the specified MatchmakingRequest message. Does not implicitly {@link matchmaking.MatchmakingRequest.verify|verify} messages.
         * @function encode
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {matchmaking.IMatchmakingRequest} message MatchmakingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchmakingRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified MatchmakingRequest message, length delimited. Does not implicitly {@link matchmaking.MatchmakingRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {matchmaking.IMatchmakingRequest} message MatchmakingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchmakingRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchmakingRequest message from the specified reader or buffer.
         * @function decode
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {matchmaking.MatchmakingRequest} MatchmakingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchmakingRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.matchmaking.MatchmakingRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchmakingRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {matchmaking.MatchmakingRequest} MatchmakingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchmakingRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchmakingRequest message.
         * @function verify
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchmakingRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a MatchmakingRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {matchmaking.MatchmakingRequest} MatchmakingRequest
         */
        MatchmakingRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.matchmaking.MatchmakingRequest)
                return object;
            let message = new $root.matchmaking.MatchmakingRequest();
            if (object.userId != null)
                message.userId = object.userId | 0;
            return message;
        };

        /**
         * Creates a plain object from a MatchmakingRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {matchmaking.MatchmakingRequest} message MatchmakingRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchmakingRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this MatchmakingRequest to JSON.
         * @function toJSON
         * @memberof matchmaking.MatchmakingRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchmakingRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchmakingRequest
         * @function getTypeUrl
         * @memberof matchmaking.MatchmakingRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchmakingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/matchmaking.MatchmakingRequest";
        };

        return MatchmakingRequest;
    })();

    return matchmaking;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Empty = (function() {

            /**
             * Properties of an Empty.
             * @memberof google.protobuf
             * @interface IEmpty
             */

            /**
             * Constructs a new Empty.
             * @memberof google.protobuf
             * @classdesc Represents an Empty.
             * @implements IEmpty
             * @constructor
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Empty instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             * @returns {google.protobuf.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Empty message.
             * @function verify
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Empty} Empty
             */
            Empty.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Empty)
                    return object;
                return new $root.google.protobuf.Empty();
            };

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.Empty} message Empty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Empty.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Empty to JSON.
             * @function toJSON
             * @memberof google.protobuf.Empty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Empty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Empty
             * @function getTypeUrl
             * @memberof google.protobuf.Empty
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Empty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Empty";
            };

            return Empty;
        })();

        return protobuf;
    })();

    return google;
})();

export const game = $root.game = (() => {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    const game = {};

    game.GameService = (function() {

        /**
         * Constructs a new GameService service.
         * @memberof game
         * @classdesc Represents a GameService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function GameService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (GameService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = GameService;

        /**
         * Creates new GameService service using the specified rpc implementation.
         * @function create
         * @memberof game.GameService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {GameService} RPC service. Useful where requests and/or responses are streamed.
         */
        GameService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link game.GameService#newGame}.
         * @memberof game.GameService
         * @typedef NewGameCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {google.protobuf.Empty} [response] Empty
         */

        /**
         * Calls NewGame.
         * @function newGame
         * @memberof game.GameService
         * @instance
         * @param {game.INewGameRequest} request NewGameRequest message or plain object
         * @param {game.GameService.NewGameCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GameService.prototype.newGame = function newGame(request, callback) {
            return this.rpcCall(newGame, $root.game.NewGameRequest, $root.google.protobuf.Empty, request, callback);
        }, "name", { value: "NewGame" });

        /**
         * Calls NewGame.
         * @function newGame
         * @memberof game.GameService
         * @instance
         * @param {game.INewGameRequest} request NewGameRequest message or plain object
         * @returns {Promise<google.protobuf.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link game.GameService#getGameInfo}.
         * @memberof game.GameService
         * @typedef GetGameInfoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {game.GetGameInfoResponse} [response] GetGameInfoResponse
         */

        /**
         * Calls GetGameInfo.
         * @function getGameInfo
         * @memberof game.GameService
         * @instance
         * @param {game.IGetGameInfoRequest} request GetGameInfoRequest message or plain object
         * @param {game.GameService.GetGameInfoCallback} callback Node-style callback called with the error, if any, and GetGameInfoResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GameService.prototype.getGameInfo = function getGameInfo(request, callback) {
            return this.rpcCall(getGameInfo, $root.game.GetGameInfoRequest, $root.game.GetGameInfoResponse, request, callback);
        }, "name", { value: "GetGameInfo" });

        /**
         * Calls GetGameInfo.
         * @function getGameInfo
         * @memberof game.GameService
         * @instance
         * @param {game.IGetGameInfoRequest} request GetGameInfoRequest message or plain object
         * @returns {Promise<game.GetGameInfoResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link game.GameService#playerPublish}.
         * @memberof game.GameService
         * @typedef PlayerPublishCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {google.protobuf.Empty} [response] Empty
         */

        /**
         * Calls PlayerPublish.
         * @function playerPublish
         * @memberof game.GameService
         * @instance
         * @param {common.IEvent} request Event message or plain object
         * @param {game.GameService.PlayerPublishCallback} callback Node-style callback called with the error, if any, and Empty
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GameService.prototype.playerPublish = function playerPublish(request, callback) {
            return this.rpcCall(playerPublish, $root.common.Event, $root.google.protobuf.Empty, request, callback);
        }, "name", { value: "PlayerPublish" });

        /**
         * Calls PlayerPublish.
         * @function playerPublish
         * @memberof game.GameService
         * @instance
         * @param {common.IEvent} request Event message or plain object
         * @returns {Promise<google.protobuf.Empty>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link game.GameService#subscribe}.
         * @memberof game.GameService
         * @typedef SubscribeCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {common.Event} [response] Event
         */

        /**
         * Calls Subscribe.
         * @function subscribe
         * @memberof game.GameService
         * @instance
         * @param {game.ISubscribeRequest} request SubscribeRequest message or plain object
         * @param {game.GameService.SubscribeCallback} callback Node-style callback called with the error, if any, and Event
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(GameService.prototype.subscribe = function subscribe(request, callback) {
            return this.rpcCall(subscribe, $root.game.SubscribeRequest, $root.common.Event, request, callback);
        }, "name", { value: "Subscribe" });

        /**
         * Calls Subscribe.
         * @function subscribe
         * @memberof game.GameService
         * @instance
         * @param {game.ISubscribeRequest} request SubscribeRequest message or plain object
         * @returns {Promise<common.Event>} Promise
         * @variation 2
         */

        return GameService;
    })();

    game.NewGameRequest = (function() {

        /**
         * Properties of a NewGameRequest.
         * @memberof game
         * @interface INewGameRequest
         * @property {number|null} [gameId] NewGameRequest gameId
         * @property {Array.<number>|null} [players] NewGameRequest players
         */

        /**
         * Constructs a new NewGameRequest.
         * @memberof game
         * @classdesc Represents a NewGameRequest.
         * @implements INewGameRequest
         * @constructor
         * @param {game.INewGameRequest=} [properties] Properties to set
         */
        function NewGameRequest(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NewGameRequest gameId.
         * @member {number} gameId
         * @memberof game.NewGameRequest
         * @instance
         */
        NewGameRequest.prototype.gameId = 0;

        /**
         * NewGameRequest players.
         * @member {Array.<number>} players
         * @memberof game.NewGameRequest
         * @instance
         */
        NewGameRequest.prototype.players = $util.emptyArray;

        /**
         * Creates a new NewGameRequest instance using the specified properties.
         * @function create
         * @memberof game.NewGameRequest
         * @static
         * @param {game.INewGameRequest=} [properties] Properties to set
         * @returns {game.NewGameRequest} NewGameRequest instance
         */
        NewGameRequest.create = function create(properties) {
            return new NewGameRequest(properties);
        };

        /**
         * Encodes the specified NewGameRequest message. Does not implicitly {@link game.NewGameRequest.verify|verify} messages.
         * @function encode
         * @memberof game.NewGameRequest
         * @static
         * @param {game.INewGameRequest} message NewGameRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewGameRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.players != null && message.players.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.players.length; ++i)
                    writer.int32(message.players[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified NewGameRequest message, length delimited. Does not implicitly {@link game.NewGameRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.NewGameRequest
         * @static
         * @param {game.INewGameRequest} message NewGameRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewGameRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NewGameRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.NewGameRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.NewGameRequest} NewGameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewGameRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.NewGameRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.players.push(reader.int32());
                        } else
                            message.players.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NewGameRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.NewGameRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.NewGameRequest} NewGameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewGameRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NewGameRequest message.
         * @function verify
         * @memberof game.NewGameRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NewGameRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i)
                    if (!$util.isInteger(message.players[i]))
                        return "players: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a NewGameRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.NewGameRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.NewGameRequest} NewGameRequest
         */
        NewGameRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.game.NewGameRequest)
                return object;
            let message = new $root.game.NewGameRequest();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".game.NewGameRequest.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i)
                    message.players[i] = object.players[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a NewGameRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.NewGameRequest
         * @static
         * @param {game.NewGameRequest} message NewGameRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NewGameRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = message.players[j];
            }
            return object;
        };

        /**
         * Converts this NewGameRequest to JSON.
         * @function toJSON
         * @memberof game.NewGameRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NewGameRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NewGameRequest
         * @function getTypeUrl
         * @memberof game.NewGameRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NewGameRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.NewGameRequest";
        };

        return NewGameRequest;
    })();

    game.GetGameInfoRequest = (function() {

        /**
         * Properties of a GetGameInfoRequest.
         * @memberof game
         * @interface IGetGameInfoRequest
         * @property {number|null} [gameId] GetGameInfoRequest gameId
         */

        /**
         * Constructs a new GetGameInfoRequest.
         * @memberof game
         * @classdesc Represents a GetGameInfoRequest.
         * @implements IGetGameInfoRequest
         * @constructor
         * @param {game.IGetGameInfoRequest=} [properties] Properties to set
         */
        function GetGameInfoRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetGameInfoRequest gameId.
         * @member {number} gameId
         * @memberof game.GetGameInfoRequest
         * @instance
         */
        GetGameInfoRequest.prototype.gameId = 0;

        /**
         * Creates a new GetGameInfoRequest instance using the specified properties.
         * @function create
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {game.IGetGameInfoRequest=} [properties] Properties to set
         * @returns {game.GetGameInfoRequest} GetGameInfoRequest instance
         */
        GetGameInfoRequest.create = function create(properties) {
            return new GetGameInfoRequest(properties);
        };

        /**
         * Encodes the specified GetGameInfoRequest message. Does not implicitly {@link game.GetGameInfoRequest.verify|verify} messages.
         * @function encode
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {game.IGetGameInfoRequest} message GetGameInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetGameInfoRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified GetGameInfoRequest message, length delimited. Does not implicitly {@link game.GetGameInfoRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {game.IGetGameInfoRequest} message GetGameInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetGameInfoRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.GetGameInfoRequest} GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetGameInfoRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.GetGameInfoRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.GetGameInfoRequest} GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetGameInfoRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetGameInfoRequest message.
         * @function verify
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetGameInfoRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            return null;
        };

        /**
         * Creates a GetGameInfoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.GetGameInfoRequest} GetGameInfoRequest
         */
        GetGameInfoRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.game.GetGameInfoRequest)
                return object;
            let message = new $root.game.GetGameInfoRequest();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            return message;
        };

        /**
         * Creates a plain object from a GetGameInfoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {game.GetGameInfoRequest} message GetGameInfoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetGameInfoRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this GetGameInfoRequest to JSON.
         * @function toJSON
         * @memberof game.GetGameInfoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetGameInfoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetGameInfoRequest
         * @function getTypeUrl
         * @memberof game.GetGameInfoRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetGameInfoRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.GetGameInfoRequest";
        };

        return GetGameInfoRequest;
    })();

    game.GetGameInfoResponse = (function() {

        /**
         * Properties of a GetGameInfoResponse.
         * @memberof game
         * @interface IGetGameInfoResponse
         * @property {number|null} [gameId] GetGameInfoResponse gameId
         * @property {common.GameState|null} [state] GetGameInfoResponse state
         * @property {Array.<common.IPlayerPropertyDto>|null} [players] GetGameInfoResponse players
         * @property {number|null} [mapWidth] GetGameInfoResponse mapWidth
         * @property {number|null} [mapHeight] GetGameInfoResponse mapHeight
         * @property {Array.<common.ITileDto>|null} [tiles] GetGameInfoResponse tiles
         */

        /**
         * Constructs a new GetGameInfoResponse.
         * @memberof game
         * @classdesc Represents a GetGameInfoResponse.
         * @implements IGetGameInfoResponse
         * @constructor
         * @param {game.IGetGameInfoResponse=} [properties] Properties to set
         */
        function GetGameInfoResponse(properties) {
            this.players = [];
            this.tiles = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetGameInfoResponse gameId.
         * @member {number} gameId
         * @memberof game.GetGameInfoResponse
         * @instance
         */
        GetGameInfoResponse.prototype.gameId = 0;

        /**
         * GetGameInfoResponse state.
         * @member {common.GameState} state
         * @memberof game.GetGameInfoResponse
         * @instance
         */
        GetGameInfoResponse.prototype.state = 0;

        /**
         * GetGameInfoResponse players.
         * @member {Array.<common.IPlayerPropertyDto>} players
         * @memberof game.GetGameInfoResponse
         * @instance
         */
        GetGameInfoResponse.prototype.players = $util.emptyArray;

        /**
         * GetGameInfoResponse mapWidth.
         * @member {number} mapWidth
         * @memberof game.GetGameInfoResponse
         * @instance
         */
        GetGameInfoResponse.prototype.mapWidth = 0;

        /**
         * GetGameInfoResponse mapHeight.
         * @member {number} mapHeight
         * @memberof game.GetGameInfoResponse
         * @instance
         */
        GetGameInfoResponse.prototype.mapHeight = 0;

        /**
         * GetGameInfoResponse tiles.
         * @member {Array.<common.ITileDto>} tiles
         * @memberof game.GetGameInfoResponse
         * @instance
         */
        GetGameInfoResponse.prototype.tiles = $util.emptyArray;

        /**
         * Creates a new GetGameInfoResponse instance using the specified properties.
         * @function create
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {game.IGetGameInfoResponse=} [properties] Properties to set
         * @returns {game.GetGameInfoResponse} GetGameInfoResponse instance
         */
        GetGameInfoResponse.create = function create(properties) {
            return new GetGameInfoResponse(properties);
        };

        /**
         * Encodes the specified GetGameInfoResponse message. Does not implicitly {@link game.GetGameInfoResponse.verify|verify} messages.
         * @function encode
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {game.IGetGameInfoResponse} message GetGameInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetGameInfoResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.common.PlayerPropertyDto.encode(message.players[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.mapWidth != null && Object.hasOwnProperty.call(message, "mapWidth"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.mapWidth);
            if (message.mapHeight != null && Object.hasOwnProperty.call(message, "mapHeight"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.mapHeight);
            if (message.tiles != null && message.tiles.length)
                for (let i = 0; i < message.tiles.length; ++i)
                    $root.common.TileDto.encode(message.tiles[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetGameInfoResponse message, length delimited. Does not implicitly {@link game.GetGameInfoResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {game.IGetGameInfoResponse} message GetGameInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetGameInfoResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetGameInfoResponse message from the specified reader or buffer.
         * @function decode
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.GetGameInfoResponse} GetGameInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetGameInfoResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.GetGameInfoResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        message.state = reader.int32();
                        break;
                    }
                case 3: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.common.PlayerPropertyDto.decode(reader, reader.uint32()));
                        break;
                    }
                case 4: {
                        message.mapWidth = reader.int32();
                        break;
                    }
                case 5: {
                        message.mapHeight = reader.int32();
                        break;
                    }
                case 6: {
                        if (!(message.tiles && message.tiles.length))
                            message.tiles = [];
                        message.tiles.push($root.common.TileDto.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetGameInfoResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.GetGameInfoResponse} GetGameInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetGameInfoResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetGameInfoResponse message.
         * @function verify
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetGameInfoResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                switch (message.state) {
                default:
                    return "state: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.common.PlayerPropertyDto.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.mapWidth != null && message.hasOwnProperty("mapWidth"))
                if (!$util.isInteger(message.mapWidth))
                    return "mapWidth: integer expected";
            if (message.mapHeight != null && message.hasOwnProperty("mapHeight"))
                if (!$util.isInteger(message.mapHeight))
                    return "mapHeight: integer expected";
            if (message.tiles != null && message.hasOwnProperty("tiles")) {
                if (!Array.isArray(message.tiles))
                    return "tiles: array expected";
                for (let i = 0; i < message.tiles.length; ++i) {
                    let error = $root.common.TileDto.verify(message.tiles[i]);
                    if (error)
                        return "tiles." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetGameInfoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.GetGameInfoResponse} GetGameInfoResponse
         */
        GetGameInfoResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.game.GetGameInfoResponse)
                return object;
            let message = new $root.game.GetGameInfoResponse();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            switch (object.state) {
            default:
                if (typeof object.state === "number") {
                    message.state = object.state;
                    break;
                }
                break;
            case "Init":
            case 0:
                message.state = 0;
                break;
            case "Preparing":
            case 1:
                message.state = 1;
                break;
            case "Prepared":
            case 2:
                message.state = 2;
                break;
            case "WaitingReady":
            case 3:
                message.state = 3;
                break;
            case "Countdown":
            case 4:
                message.state = 4;
                break;
            case "Playing":
            case 5:
                message.state = 5;
                break;
            case "Gameover":
            case 6:
                message.state = 6;
                break;
            case "Crash":
            case 7:
                message.state = 7;
                break;
            }
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".game.GetGameInfoResponse.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".game.GetGameInfoResponse.players: object expected");
                    message.players[i] = $root.common.PlayerPropertyDto.fromObject(object.players[i]);
                }
            }
            if (object.mapWidth != null)
                message.mapWidth = object.mapWidth | 0;
            if (object.mapHeight != null)
                message.mapHeight = object.mapHeight | 0;
            if (object.tiles) {
                if (!Array.isArray(object.tiles))
                    throw TypeError(".game.GetGameInfoResponse.tiles: array expected");
                message.tiles = [];
                for (let i = 0; i < object.tiles.length; ++i) {
                    if (typeof object.tiles[i] !== "object")
                        throw TypeError(".game.GetGameInfoResponse.tiles: object expected");
                    message.tiles[i] = $root.common.TileDto.fromObject(object.tiles[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetGameInfoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {game.GetGameInfoResponse} message GetGameInfoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetGameInfoResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.players = [];
                object.tiles = [];
            }
            if (options.defaults) {
                object.gameId = 0;
                object.state = options.enums === String ? "Init" : 0;
                object.mapWidth = 0;
                object.mapHeight = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.enums === String ? $root.common.GameState[message.state] === undefined ? message.state : $root.common.GameState[message.state] : message.state;
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.common.PlayerPropertyDto.toObject(message.players[j], options);
            }
            if (message.mapWidth != null && message.hasOwnProperty("mapWidth"))
                object.mapWidth = message.mapWidth;
            if (message.mapHeight != null && message.hasOwnProperty("mapHeight"))
                object.mapHeight = message.mapHeight;
            if (message.tiles && message.tiles.length) {
                object.tiles = [];
                for (let j = 0; j < message.tiles.length; ++j)
                    object.tiles[j] = $root.common.TileDto.toObject(message.tiles[j], options);
            }
            return object;
        };

        /**
         * Converts this GetGameInfoResponse to JSON.
         * @function toJSON
         * @memberof game.GetGameInfoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetGameInfoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetGameInfoResponse
         * @function getTypeUrl
         * @memberof game.GetGameInfoResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetGameInfoResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.GetGameInfoResponse";
        };

        return GetGameInfoResponse;
    })();

    game.SubscribeRequest = (function() {

        /**
         * Properties of a SubscribeRequest.
         * @memberof game
         * @interface ISubscribeRequest
         * @property {number|null} [gameId] SubscribeRequest gameId
         * @property {Array.<common.EventType>|null} [types] SubscribeRequest types
         */

        /**
         * Constructs a new SubscribeRequest.
         * @memberof game
         * @classdesc Represents a SubscribeRequest.
         * @implements ISubscribeRequest
         * @constructor
         * @param {game.ISubscribeRequest=} [properties] Properties to set
         */
        function SubscribeRequest(properties) {
            this.types = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscribeRequest gameId.
         * @member {number} gameId
         * @memberof game.SubscribeRequest
         * @instance
         */
        SubscribeRequest.prototype.gameId = 0;

        /**
         * SubscribeRequest types.
         * @member {Array.<common.EventType>} types
         * @memberof game.SubscribeRequest
         * @instance
         */
        SubscribeRequest.prototype.types = $util.emptyArray;

        /**
         * Creates a new SubscribeRequest instance using the specified properties.
         * @function create
         * @memberof game.SubscribeRequest
         * @static
         * @param {game.ISubscribeRequest=} [properties] Properties to set
         * @returns {game.SubscribeRequest} SubscribeRequest instance
         */
        SubscribeRequest.create = function create(properties) {
            return new SubscribeRequest(properties);
        };

        /**
         * Encodes the specified SubscribeRequest message. Does not implicitly {@link game.SubscribeRequest.verify|verify} messages.
         * @function encode
         * @memberof game.SubscribeRequest
         * @static
         * @param {game.ISubscribeRequest} message SubscribeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscribeRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.types != null && message.types.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.types.length; ++i)
                    writer.int32(message.types[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified SubscribeRequest message, length delimited. Does not implicitly {@link game.SubscribeRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.SubscribeRequest
         * @static
         * @param {game.ISubscribeRequest} message SubscribeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscribeRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SubscribeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof game.SubscribeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.SubscribeRequest} SubscribeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscribeRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.SubscribeRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.types && message.types.length))
                            message.types = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.types.push(reader.int32());
                        } else
                            message.types.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SubscribeRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.SubscribeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.SubscribeRequest} SubscribeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscribeRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SubscribeRequest message.
         * @function verify
         * @memberof game.SubscribeRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SubscribeRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.types != null && message.hasOwnProperty("types")) {
                if (!Array.isArray(message.types))
                    return "types: array expected";
                for (let i = 0; i < message.types.length; ++i)
                    switch (message.types[i]) {
                    default:
                        return "types: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                        break;
                    }
            }
            return null;
        };

        /**
         * Creates a SubscribeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.SubscribeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.SubscribeRequest} SubscribeRequest
         */
        SubscribeRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.game.SubscribeRequest)
                return object;
            let message = new $root.game.SubscribeRequest();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.types) {
                if (!Array.isArray(object.types))
                    throw TypeError(".game.SubscribeRequest.types: array expected");
                message.types = [];
                for (let i = 0; i < object.types.length; ++i)
                    switch (object.types[i]) {
                    default:
                        if (typeof object.types[i] === "number") {
                            message.types[i] = object.types[i];
                            break;
                        }
                    case "SessionRun":
                    case 0:
                        message.types[i] = 0;
                        break;
                    case "SubscribeNewMatch":
                    case 1:
                        message.types[i] = 1;
                        break;
                    case "NewMatch":
                    case 2:
                        message.types[i] = 2;
                        break;
                    case "StatePreparing":
                    case 3:
                        message.types[i] = 3;
                        break;
                    case "StatePrepared":
                    case 4:
                        message.types[i] = 4;
                        break;
                    case "StateWaitingReady":
                    case 5:
                        message.types[i] = 5;
                        break;
                    case "StateCountdown":
                    case 6:
                        message.types[i] = 6;
                        break;
                    case "StatePlaying":
                    case 7:
                        message.types[i] = 7;
                        break;
                    case "StateGameover":
                    case 8:
                        message.types[i] = 8;
                        break;
                    case "StateCrash":
                    case 9:
                        message.types[i] = 9;
                        break;
                    case "WinConditionSatisfied":
                    case 10:
                        message.types[i] = 10;
                        break;
                    case "PlayerReady":
                    case 21:
                        message.types[i] = 21;
                        break;
                    case "PlayerMove":
                    case 22:
                        message.types[i] = 22;
                        break;
                    case "PlayerGetPowerup":
                    case 23:
                        message.types[i] = 23;
                        break;
                    case "PlayerPlantBomb":
                    case 24:
                        message.types[i] = 24;
                        break;
                    case "PlayerMoved":
                    case 31:
                        message.types[i] = 31;
                        break;
                    case "PlayerDead":
                    case 32:
                        message.types[i] = 32;
                        break;
                    case "BombPlanted":
                    case 33:
                        message.types[i] = 33;
                        break;
                    case "BombWillExplode":
                    case 34:
                        message.types[i] = 34;
                        break;
                    case "BombExploded":
                    case 35:
                        message.types[i] = 35;
                        break;
                    case "BoxRemoved":
                    case 36:
                        message.types[i] = 36;
                        break;
                    case "PowerupDropped":
                    case 37:
                        message.types[i] = 37;
                        break;
                    case "PowerupConsumed":
                    case 38:
                        message.types[i] = 38;
                        break;
                    }
            }
            return message;
        };

        /**
         * Creates a plain object from a SubscribeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.SubscribeRequest
         * @static
         * @param {game.SubscribeRequest} message SubscribeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscribeRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.types = [];
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.types && message.types.length) {
                object.types = [];
                for (let j = 0; j < message.types.length; ++j)
                    object.types[j] = options.enums === String ? $root.common.EventType[message.types[j]] === undefined ? message.types[j] : $root.common.EventType[message.types[j]] : message.types[j];
            }
            return object;
        };

        /**
         * Converts this SubscribeRequest to JSON.
         * @function toJSON
         * @memberof game.SubscribeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscribeRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscribeRequest
         * @function getTypeUrl
         * @memberof game.SubscribeRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscribeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game.SubscribeRequest";
        };

        return SubscribeRequest;
    })();

    return game;
})();

export const http_api = $root.http_api = (() => {

    /**
     * Namespace http_api.
     * @exports http_api
     * @namespace
     */
    const http_api = {};

    http_api.RegisterRequest = (function() {

        /**
         * Properties of a RegisterRequest.
         * @memberof http_api
         * @interface IRegisterRequest
         * @property {string|null} [nickname] RegisterRequest nickname
         */

        /**
         * Constructs a new RegisterRequest.
         * @memberof http_api
         * @classdesc Represents a RegisterRequest.
         * @implements IRegisterRequest
         * @constructor
         * @param {http_api.IRegisterRequest=} [properties] Properties to set
         */
        function RegisterRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegisterRequest nickname.
         * @member {string} nickname
         * @memberof http_api.RegisterRequest
         * @instance
         */
        RegisterRequest.prototype.nickname = "";

        /**
         * Creates a new RegisterRequest instance using the specified properties.
         * @function create
         * @memberof http_api.RegisterRequest
         * @static
         * @param {http_api.IRegisterRequest=} [properties] Properties to set
         * @returns {http_api.RegisterRequest} RegisterRequest instance
         */
        RegisterRequest.create = function create(properties) {
            return new RegisterRequest(properties);
        };

        /**
         * Encodes the specified RegisterRequest message. Does not implicitly {@link http_api.RegisterRequest.verify|verify} messages.
         * @function encode
         * @memberof http_api.RegisterRequest
         * @static
         * @param {http_api.IRegisterRequest} message RegisterRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link http_api.RegisterRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof http_api.RegisterRequest
         * @static
         * @param {http_api.IRegisterRequest} message RegisterRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer.
         * @function decode
         * @memberof http_api.RegisterRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {http_api.RegisterRequest} RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.http_api.RegisterRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof http_api.RegisterRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {http_api.RegisterRequest} RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegisterRequest message.
         * @function verify
         * @memberof http_api.RegisterRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegisterRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof http_api.RegisterRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {http_api.RegisterRequest} RegisterRequest
         */
        RegisterRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.http_api.RegisterRequest)
                return object;
            let message = new $root.http_api.RegisterRequest();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof http_api.RegisterRequest
         * @static
         * @param {http_api.RegisterRequest} message RegisterRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegisterRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.nickname = "";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this RegisterRequest to JSON.
         * @function toJSON
         * @memberof http_api.RegisterRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegisterRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RegisterRequest
         * @function getTypeUrl
         * @memberof http_api.RegisterRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RegisterRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/http_api.RegisterRequest";
        };

        return RegisterRequest;
    })();

    http_api.RegisterResponse = (function() {

        /**
         * Properties of a RegisterResponse.
         * @memberof http_api
         * @interface IRegisterResponse
         * @property {string|null} [apiKey] RegisterResponse apiKey
         * @property {number|null} [userId] RegisterResponse userId
         */

        /**
         * Constructs a new RegisterResponse.
         * @memberof http_api
         * @classdesc Represents a RegisterResponse.
         * @implements IRegisterResponse
         * @constructor
         * @param {http_api.IRegisterResponse=} [properties] Properties to set
         */
        function RegisterResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegisterResponse apiKey.
         * @member {string} apiKey
         * @memberof http_api.RegisterResponse
         * @instance
         */
        RegisterResponse.prototype.apiKey = "";

        /**
         * RegisterResponse userId.
         * @member {number} userId
         * @memberof http_api.RegisterResponse
         * @instance
         */
        RegisterResponse.prototype.userId = 0;

        /**
         * Creates a new RegisterResponse instance using the specified properties.
         * @function create
         * @memberof http_api.RegisterResponse
         * @static
         * @param {http_api.IRegisterResponse=} [properties] Properties to set
         * @returns {http_api.RegisterResponse} RegisterResponse instance
         */
        RegisterResponse.create = function create(properties) {
            return new RegisterResponse(properties);
        };

        /**
         * Encodes the specified RegisterResponse message. Does not implicitly {@link http_api.RegisterResponse.verify|verify} messages.
         * @function encode
         * @memberof http_api.RegisterResponse
         * @static
         * @param {http_api.IRegisterResponse} message RegisterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.apiKey != null && Object.hasOwnProperty.call(message, "apiKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.apiKey);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
            return writer;
        };

        /**
         * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link http_api.RegisterResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof http_api.RegisterResponse
         * @static
         * @param {http_api.IRegisterResponse} message RegisterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegisterResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer.
         * @function decode
         * @memberof http_api.RegisterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {http_api.RegisterResponse} RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.http_api.RegisterResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.apiKey = reader.string();
                        break;
                    }
                case 2: {
                        message.userId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof http_api.RegisterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {http_api.RegisterResponse} RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegisterResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegisterResponse message.
         * @function verify
         * @memberof http_api.RegisterResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegisterResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                if (!$util.isString(message.apiKey))
                    return "apiKey: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };

        /**
         * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof http_api.RegisterResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {http_api.RegisterResponse} RegisterResponse
         */
        RegisterResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.http_api.RegisterResponse)
                return object;
            let message = new $root.http_api.RegisterResponse();
            if (object.apiKey != null)
                message.apiKey = String(object.apiKey);
            if (object.userId != null)
                message.userId = object.userId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof http_api.RegisterResponse
         * @static
         * @param {http_api.RegisterResponse} message RegisterResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegisterResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.apiKey = "";
                object.userId = 0;
            }
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                object.apiKey = message.apiKey;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };

        /**
         * Converts this RegisterResponse to JSON.
         * @function toJSON
         * @memberof http_api.RegisterResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegisterResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RegisterResponse
         * @function getTypeUrl
         * @memberof http_api.RegisterResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RegisterResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/http_api.RegisterResponse";
        };

        return RegisterResponse;
    })();

    http_api.ValidateRequest = (function() {

        /**
         * Properties of a ValidateRequest.
         * @memberof http_api
         * @interface IValidateRequest
         * @property {string|null} [apiKey] ValidateRequest apiKey
         */

        /**
         * Constructs a new ValidateRequest.
         * @memberof http_api
         * @classdesc Represents a ValidateRequest.
         * @implements IValidateRequest
         * @constructor
         * @param {http_api.IValidateRequest=} [properties] Properties to set
         */
        function ValidateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateRequest apiKey.
         * @member {string} apiKey
         * @memberof http_api.ValidateRequest
         * @instance
         */
        ValidateRequest.prototype.apiKey = "";

        /**
         * Creates a new ValidateRequest instance using the specified properties.
         * @function create
         * @memberof http_api.ValidateRequest
         * @static
         * @param {http_api.IValidateRequest=} [properties] Properties to set
         * @returns {http_api.ValidateRequest} ValidateRequest instance
         */
        ValidateRequest.create = function create(properties) {
            return new ValidateRequest(properties);
        };

        /**
         * Encodes the specified ValidateRequest message. Does not implicitly {@link http_api.ValidateRequest.verify|verify} messages.
         * @function encode
         * @memberof http_api.ValidateRequest
         * @static
         * @param {http_api.IValidateRequest} message ValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.apiKey != null && Object.hasOwnProperty.call(message, "apiKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.apiKey);
            return writer;
        };

        /**
         * Encodes the specified ValidateRequest message, length delimited. Does not implicitly {@link http_api.ValidateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof http_api.ValidateRequest
         * @static
         * @param {http_api.IValidateRequest} message ValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValidateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof http_api.ValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {http_api.ValidateRequest} ValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.http_api.ValidateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.apiKey = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValidateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof http_api.ValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {http_api.ValidateRequest} ValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidateRequest message.
         * @function verify
         * @memberof http_api.ValidateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidateRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                if (!$util.isString(message.apiKey))
                    return "apiKey: string expected";
            return null;
        };

        /**
         * Creates a ValidateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof http_api.ValidateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {http_api.ValidateRequest} ValidateRequest
         */
        ValidateRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.http_api.ValidateRequest)
                return object;
            let message = new $root.http_api.ValidateRequest();
            if (object.apiKey != null)
                message.apiKey = String(object.apiKey);
            return message;
        };

        /**
         * Creates a plain object from a ValidateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof http_api.ValidateRequest
         * @static
         * @param {http_api.ValidateRequest} message ValidateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.apiKey = "";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                object.apiKey = message.apiKey;
            return object;
        };

        /**
         * Converts this ValidateRequest to JSON.
         * @function toJSON
         * @memberof http_api.ValidateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateRequest
         * @function getTypeUrl
         * @memberof http_api.ValidateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/http_api.ValidateRequest";
        };

        return ValidateRequest;
    })();

    http_api.ValidateResponse = (function() {

        /**
         * Properties of a ValidateResponse.
         * @memberof http_api
         * @interface IValidateResponse
         * @property {auth.IPlayerInfoDto|null} [player] ValidateResponse player
         */

        /**
         * Constructs a new ValidateResponse.
         * @memberof http_api
         * @classdesc Represents a ValidateResponse.
         * @implements IValidateResponse
         * @constructor
         * @param {http_api.IValidateResponse=} [properties] Properties to set
         */
        function ValidateResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateResponse player.
         * @member {auth.IPlayerInfoDto|null|undefined} player
         * @memberof http_api.ValidateResponse
         * @instance
         */
        ValidateResponse.prototype.player = null;

        /**
         * Creates a new ValidateResponse instance using the specified properties.
         * @function create
         * @memberof http_api.ValidateResponse
         * @static
         * @param {http_api.IValidateResponse=} [properties] Properties to set
         * @returns {http_api.ValidateResponse} ValidateResponse instance
         */
        ValidateResponse.create = function create(properties) {
            return new ValidateResponse(properties);
        };

        /**
         * Encodes the specified ValidateResponse message. Does not implicitly {@link http_api.ValidateResponse.verify|verify} messages.
         * @function encode
         * @memberof http_api.ValidateResponse
         * @static
         * @param {http_api.IValidateResponse} message ValidateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                $root.auth.PlayerInfoDto.encode(message.player, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ValidateResponse message, length delimited. Does not implicitly {@link http_api.ValidateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof http_api.ValidateResponse
         * @static
         * @param {http_api.IValidateResponse} message ValidateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValidateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof http_api.ValidateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {http_api.ValidateResponse} ValidateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.http_api.ValidateResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.player = $root.auth.PlayerInfoDto.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValidateResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof http_api.ValidateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {http_api.ValidateResponse} ValidateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidateResponse message.
         * @function verify
         * @memberof http_api.ValidateResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidateResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.player != null && message.hasOwnProperty("player")) {
                let error = $root.auth.PlayerInfoDto.verify(message.player);
                if (error)
                    return "player." + error;
            }
            return null;
        };

        /**
         * Creates a ValidateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof http_api.ValidateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {http_api.ValidateResponse} ValidateResponse
         */
        ValidateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.http_api.ValidateResponse)
                return object;
            let message = new $root.http_api.ValidateResponse();
            if (object.player != null) {
                if (typeof object.player !== "object")
                    throw TypeError(".http_api.ValidateResponse.player: object expected");
                message.player = $root.auth.PlayerInfoDto.fromObject(object.player);
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof http_api.ValidateResponse
         * @static
         * @param {http_api.ValidateResponse} message ValidateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.player = null;
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = $root.auth.PlayerInfoDto.toObject(message.player, options);
            return object;
        };

        /**
         * Converts this ValidateResponse to JSON.
         * @function toJSON
         * @memberof http_api.ValidateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateResponse
         * @function getTypeUrl
         * @memberof http_api.ValidateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/http_api.ValidateResponse";
        };

        return ValidateResponse;
    })();

    http_api.GetGameInfoRequest = (function() {

        /**
         * Properties of a GetGameInfoRequest.
         * @memberof http_api
         * @interface IGetGameInfoRequest
         * @property {string|null} [apiKey] GetGameInfoRequest apiKey
         * @property {number|null} [gameId] GetGameInfoRequest gameId
         */

        /**
         * Constructs a new GetGameInfoRequest.
         * @memberof http_api
         * @classdesc Represents a GetGameInfoRequest.
         * @implements IGetGameInfoRequest
         * @constructor
         * @param {http_api.IGetGameInfoRequest=} [properties] Properties to set
         */
        function GetGameInfoRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetGameInfoRequest apiKey.
         * @member {string} apiKey
         * @memberof http_api.GetGameInfoRequest
         * @instance
         */
        GetGameInfoRequest.prototype.apiKey = "";

        /**
         * GetGameInfoRequest gameId.
         * @member {number} gameId
         * @memberof http_api.GetGameInfoRequest
         * @instance
         */
        GetGameInfoRequest.prototype.gameId = 0;

        /**
         * Creates a new GetGameInfoRequest instance using the specified properties.
         * @function create
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {http_api.IGetGameInfoRequest=} [properties] Properties to set
         * @returns {http_api.GetGameInfoRequest} GetGameInfoRequest instance
         */
        GetGameInfoRequest.create = function create(properties) {
            return new GetGameInfoRequest(properties);
        };

        /**
         * Encodes the specified GetGameInfoRequest message. Does not implicitly {@link http_api.GetGameInfoRequest.verify|verify} messages.
         * @function encode
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {http_api.IGetGameInfoRequest} message GetGameInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetGameInfoRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.apiKey != null && Object.hasOwnProperty.call(message, "apiKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.apiKey);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified GetGameInfoRequest message, length delimited. Does not implicitly {@link http_api.GetGameInfoRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {http_api.IGetGameInfoRequest} message GetGameInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetGameInfoRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer.
         * @function decode
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {http_api.GetGameInfoRequest} GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetGameInfoRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.http_api.GetGameInfoRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.apiKey = reader.string();
                        break;
                    }
                case 2: {
                        message.gameId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {http_api.GetGameInfoRequest} GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetGameInfoRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetGameInfoRequest message.
         * @function verify
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetGameInfoRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                if (!$util.isString(message.apiKey))
                    return "apiKey: string expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            return null;
        };

        /**
         * Creates a GetGameInfoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {http_api.GetGameInfoRequest} GetGameInfoRequest
         */
        GetGameInfoRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.http_api.GetGameInfoRequest)
                return object;
            let message = new $root.http_api.GetGameInfoRequest();
            if (object.apiKey != null)
                message.apiKey = String(object.apiKey);
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            return message;
        };

        /**
         * Creates a plain object from a GetGameInfoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {http_api.GetGameInfoRequest} message GetGameInfoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetGameInfoRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.apiKey = "";
                object.gameId = 0;
            }
            if (message.apiKey != null && message.hasOwnProperty("apiKey"))
                object.apiKey = message.apiKey;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this GetGameInfoRequest to JSON.
         * @function toJSON
         * @memberof http_api.GetGameInfoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetGameInfoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetGameInfoRequest
         * @function getTypeUrl
         * @memberof http_api.GetGameInfoRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetGameInfoRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/http_api.GetGameInfoRequest";
        };

        return GetGameInfoRequest;
    })();

    return http_api;
})();

export { $root as default };
