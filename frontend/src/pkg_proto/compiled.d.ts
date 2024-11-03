import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace common. */
export namespace common {

    /** GameState enum. */
    enum GameState {
        Init = 0,
        Preparing = 1,
        Prepared = 2,
        WaitingReady = 3,
        Countdown = 4,
        Playing = 5,
        Gameover = 6,
        Crash = 7
    }

    /** EventType enum. */
    enum EventType {
        SessionRun = 0,
        NewMatch = 1,
        StatePreparing = 2,
        StatePrepared = 3,
        StateWaitingReady = 4,
        StateCountdown = 5,
        StatePlaying = 6,
        StateGameover = 7,
        StateCrash = 8,
        WinConditionSatisfied = 9,
        PlayerMoved = 11,
        PlayerDead = 12,
        BombPlanted = 13,
        BombWillExplode = 14,
        BombExploded = 15,
        BoxRemoved = 16,
        PowerupDropped = 17,
        PowerupConsumed = 18,
        SubscribeNewMatch = 21,
        PlayerReady = 22,
        PlayerMove = 23,
        PlayerGetPowerup = 24,
        PlayerPlantBomb = 25
    }

    /** Properties of an Event. */
    interface IEvent {

        /** Event type */
        type?: (common.EventType|null);

        /** Event timestamp */
        timestamp?: (number|Long|null);

        /** Event gameId */
        gameId?: (number|null);

        /** Event newMatch */
        newMatch?: (common.INewMatchData|null);

        /** Event countdown */
        countdown?: (common.ICountdownData|null);

        /** Event gameOver */
        gameOver?: (common.IGameOverData|null);

        /** Event crash */
        crash?: (common.ICrashData|null);

        /** Event playerReady */
        playerReady?: (common.IPlayerReadyData|null);

        /** Event playerMove */
        playerMove?: (common.IPlayerMoveData|null);

        /** Event playerGetPowerup */
        playerGetPowerup?: (common.IPlayerGetPowerupData|null);

        /** Event playerPlantBomb */
        playerPlantBomb?: (common.IPlayerPlantBombData|null);

        /** Event playerMoved */
        playerMoved?: (common.IPlayerMovedData|null);

        /** Event playerDead */
        playerDead?: (common.IPlayerDeadData|null);

        /** Event bombPlanted */
        bombPlanted?: (common.IBombPlantedData|null);

        /** Event bombWillExplode */
        bombWillExplode?: (common.IBombWillExplodeData|null);

        /** Event bombExploded */
        bombExploded?: (common.IBombExplodedData|null);

        /** Event boxRemoved */
        boxRemoved?: (common.IBoxRemovedData|null);

        /** Event powerupDropped */
        powerupDropped?: (common.IPowerupDroppedData|null);

        /** Event powerupConsumed */
        powerupConsumed?: (common.IPowerupConsumedData|null);
    }

    /** Represents an Event. */
    class Event implements IEvent {

        /**
         * Constructs a new Event.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IEvent);

        /** Event type. */
        public type: common.EventType;

        /** Event timestamp. */
        public timestamp: (number|Long);

        /** Event gameId. */
        public gameId: number;

        /** Event newMatch. */
        public newMatch?: (common.INewMatchData|null);

        /** Event countdown. */
        public countdown?: (common.ICountdownData|null);

        /** Event gameOver. */
        public gameOver?: (common.IGameOverData|null);

        /** Event crash. */
        public crash?: (common.ICrashData|null);

        /** Event playerReady. */
        public playerReady?: (common.IPlayerReadyData|null);

        /** Event playerMove. */
        public playerMove?: (common.IPlayerMoveData|null);

        /** Event playerGetPowerup. */
        public playerGetPowerup?: (common.IPlayerGetPowerupData|null);

        /** Event playerPlantBomb. */
        public playerPlantBomb?: (common.IPlayerPlantBombData|null);

        /** Event playerMoved. */
        public playerMoved?: (common.IPlayerMovedData|null);

        /** Event playerDead. */
        public playerDead?: (common.IPlayerDeadData|null);

        /** Event bombPlanted. */
        public bombPlanted?: (common.IBombPlantedData|null);

        /** Event bombWillExplode. */
        public bombWillExplode?: (common.IBombWillExplodeData|null);

        /** Event bombExploded. */
        public bombExploded?: (common.IBombExplodedData|null);

        /** Event boxRemoved. */
        public boxRemoved?: (common.IBoxRemovedData|null);

        /** Event powerupDropped. */
        public powerupDropped?: (common.IPowerupDroppedData|null);

        /** Event powerupConsumed. */
        public powerupConsumed?: (common.IPowerupConsumedData|null);

        /** Event data. */
        public data?: ("newMatch"|"countdown"|"gameOver"|"crash"|"playerReady"|"playerMove"|"playerGetPowerup"|"playerPlantBomb"|"playerMoved"|"playerDead"|"bombPlanted"|"bombWillExplode"|"bombExploded"|"boxRemoved"|"powerupDropped"|"powerupConsumed");

        /**
         * Creates a new Event instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Event instance
         */
        public static create(properties?: common.IEvent): common.Event;

        /**
         * Encodes the specified Event message. Does not implicitly {@link common.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link common.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.Event;

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.Event;

        /**
         * Verifies an Event message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Event
         */
        public static fromObject(object: { [k: string]: any }): common.Event;

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @param message Event
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Event to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Event
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CountdownData. */
    interface ICountdownData {

        /** CountdownData startTs */
        startTs?: (number|Long|null);

        /** CountdownData endTs */
        endTs?: (number|Long|null);
    }

    /** Represents a CountdownData. */
    class CountdownData implements ICountdownData {

        /**
         * Constructs a new CountdownData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.ICountdownData);

        /** CountdownData startTs. */
        public startTs: (number|Long);

        /** CountdownData endTs. */
        public endTs: (number|Long);

        /**
         * Creates a new CountdownData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CountdownData instance
         */
        public static create(properties?: common.ICountdownData): common.CountdownData;

        /**
         * Encodes the specified CountdownData message. Does not implicitly {@link common.CountdownData.verify|verify} messages.
         * @param message CountdownData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.ICountdownData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CountdownData message, length delimited. Does not implicitly {@link common.CountdownData.verify|verify} messages.
         * @param message CountdownData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.ICountdownData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CountdownData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CountdownData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.CountdownData;

        /**
         * Decodes a CountdownData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CountdownData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.CountdownData;

        /**
         * Verifies a CountdownData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CountdownData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CountdownData
         */
        public static fromObject(object: { [k: string]: any }): common.CountdownData;

        /**
         * Creates a plain object from a CountdownData message. Also converts values to other types if specified.
         * @param message CountdownData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.CountdownData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CountdownData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CountdownData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameOverData. */
    interface IGameOverData {

        /** GameOverData reason */
        reason?: (common.GameOverReason|null);

        /** GameOverData winnerUserId */
        winnerUserId?: (number|null);
    }

    /** Represents a GameOverData. */
    class GameOverData implements IGameOverData {

        /**
         * Constructs a new GameOverData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IGameOverData);

        /** GameOverData reason. */
        public reason: common.GameOverReason;

        /** GameOverData winnerUserId. */
        public winnerUserId: number;

        /**
         * Creates a new GameOverData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameOverData instance
         */
        public static create(properties?: common.IGameOverData): common.GameOverData;

        /**
         * Encodes the specified GameOverData message. Does not implicitly {@link common.GameOverData.verify|verify} messages.
         * @param message GameOverData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IGameOverData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameOverData message, length delimited. Does not implicitly {@link common.GameOverData.verify|verify} messages.
         * @param message GameOverData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IGameOverData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameOverData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameOverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.GameOverData;

        /**
         * Decodes a GameOverData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameOverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.GameOverData;

        /**
         * Verifies a GameOverData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameOverData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameOverData
         */
        public static fromObject(object: { [k: string]: any }): common.GameOverData;

        /**
         * Creates a plain object from a GameOverData message. Also converts values to other types if specified.
         * @param message GameOverData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.GameOverData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameOverData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameOverData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** GameOverReason enum. */
    enum GameOverReason {
        Reason_WinConditionSatisfied = 0,
        Reason_TimesUp = 1
    }

    /** Properties of a CrashData. */
    interface ICrashData {

        /** CrashData reason */
        reason?: (string|null);
    }

    /** Represents a CrashData. */
    class CrashData implements ICrashData {

        /**
         * Constructs a new CrashData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.ICrashData);

        /** CrashData reason. */
        public reason: string;

        /**
         * Creates a new CrashData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CrashData instance
         */
        public static create(properties?: common.ICrashData): common.CrashData;

        /**
         * Encodes the specified CrashData message. Does not implicitly {@link common.CrashData.verify|verify} messages.
         * @param message CrashData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.ICrashData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CrashData message, length delimited. Does not implicitly {@link common.CrashData.verify|verify} messages.
         * @param message CrashData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.ICrashData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CrashData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CrashData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.CrashData;

        /**
         * Decodes a CrashData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CrashData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.CrashData;

        /**
         * Verifies a CrashData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CrashData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CrashData
         */
        public static fromObject(object: { [k: string]: any }): common.CrashData;

        /**
         * Creates a plain object from a CrashData message. Also converts values to other types if specified.
         * @param message CrashData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.CrashData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CrashData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CrashData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a NewMatchData. */
    interface INewMatchData {

        /** NewMatchData players */
        players?: (number[]|null);
    }

    /** Represents a NewMatchData. */
    class NewMatchData implements INewMatchData {

        /**
         * Constructs a new NewMatchData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.INewMatchData);

        /** NewMatchData players. */
        public players: number[];

        /**
         * Creates a new NewMatchData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NewMatchData instance
         */
        public static create(properties?: common.INewMatchData): common.NewMatchData;

        /**
         * Encodes the specified NewMatchData message. Does not implicitly {@link common.NewMatchData.verify|verify} messages.
         * @param message NewMatchData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.INewMatchData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NewMatchData message, length delimited. Does not implicitly {@link common.NewMatchData.verify|verify} messages.
         * @param message NewMatchData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.INewMatchData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NewMatchData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NewMatchData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.NewMatchData;

        /**
         * Decodes a NewMatchData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NewMatchData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.NewMatchData;

        /**
         * Verifies a NewMatchData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NewMatchData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NewMatchData
         */
        public static fromObject(object: { [k: string]: any }): common.NewMatchData;

        /**
         * Creates a plain object from a NewMatchData message. Also converts values to other types if specified.
         * @param message NewMatchData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.NewMatchData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NewMatchData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for NewMatchData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerReadyData. */
    interface IPlayerReadyData {

        /** PlayerReadyData userId */
        userId?: (number|null);
    }

    /** Represents a PlayerReadyData. */
    class PlayerReadyData implements IPlayerReadyData {

        /**
         * Constructs a new PlayerReadyData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerReadyData);

        /** PlayerReadyData userId. */
        public userId: number;

        /**
         * Creates a new PlayerReadyData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerReadyData instance
         */
        public static create(properties?: common.IPlayerReadyData): common.PlayerReadyData;

        /**
         * Encodes the specified PlayerReadyData message. Does not implicitly {@link common.PlayerReadyData.verify|verify} messages.
         * @param message PlayerReadyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerReadyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerReadyData message, length delimited. Does not implicitly {@link common.PlayerReadyData.verify|verify} messages.
         * @param message PlayerReadyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerReadyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerReadyData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerReadyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerReadyData;

        /**
         * Decodes a PlayerReadyData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerReadyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerReadyData;

        /**
         * Verifies a PlayerReadyData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerReadyData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerReadyData
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerReadyData;

        /**
         * Creates a plain object from a PlayerReadyData message. Also converts values to other types if specified.
         * @param message PlayerReadyData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerReadyData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerReadyData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerReadyData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerMoveData. */
    interface IPlayerMoveData {

        /** PlayerMoveData userId */
        userId?: (number|null);

        /** PlayerMoveData x */
        x?: (number|null);

        /** PlayerMoveData y */
        y?: (number|null);
    }

    /** Represents a PlayerMoveData. */
    class PlayerMoveData implements IPlayerMoveData {

        /**
         * Constructs a new PlayerMoveData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerMoveData);

        /** PlayerMoveData userId. */
        public userId: number;

        /** PlayerMoveData x. */
        public x: number;

        /** PlayerMoveData y. */
        public y: number;

        /**
         * Creates a new PlayerMoveData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerMoveData instance
         */
        public static create(properties?: common.IPlayerMoveData): common.PlayerMoveData;

        /**
         * Encodes the specified PlayerMoveData message. Does not implicitly {@link common.PlayerMoveData.verify|verify} messages.
         * @param message PlayerMoveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerMoveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerMoveData message, length delimited. Does not implicitly {@link common.PlayerMoveData.verify|verify} messages.
         * @param message PlayerMoveData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerMoveData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerMoveData;

        /**
         * Decodes a PlayerMoveData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerMoveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerMoveData;

        /**
         * Verifies a PlayerMoveData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerMoveData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerMoveData
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerMoveData;

        /**
         * Creates a plain object from a PlayerMoveData message. Also converts values to other types if specified.
         * @param message PlayerMoveData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerMoveData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerMoveData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerMoveData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerGetPowerupData. */
    interface IPlayerGetPowerupData {

        /** PlayerGetPowerupData userId */
        userId?: (number|null);

        /** PlayerGetPowerupData x */
        x?: (number|null);

        /** PlayerGetPowerupData y */
        y?: (number|null);
    }

    /** Represents a PlayerGetPowerupData. */
    class PlayerGetPowerupData implements IPlayerGetPowerupData {

        /**
         * Constructs a new PlayerGetPowerupData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerGetPowerupData);

        /** PlayerGetPowerupData userId. */
        public userId: number;

        /** PlayerGetPowerupData x. */
        public x: number;

        /** PlayerGetPowerupData y. */
        public y: number;

        /**
         * Creates a new PlayerGetPowerupData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerGetPowerupData instance
         */
        public static create(properties?: common.IPlayerGetPowerupData): common.PlayerGetPowerupData;

        /**
         * Encodes the specified PlayerGetPowerupData message. Does not implicitly {@link common.PlayerGetPowerupData.verify|verify} messages.
         * @param message PlayerGetPowerupData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerGetPowerupData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerGetPowerupData message, length delimited. Does not implicitly {@link common.PlayerGetPowerupData.verify|verify} messages.
         * @param message PlayerGetPowerupData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerGetPowerupData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerGetPowerupData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerGetPowerupData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerGetPowerupData;

        /**
         * Decodes a PlayerGetPowerupData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerGetPowerupData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerGetPowerupData;

        /**
         * Verifies a PlayerGetPowerupData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerGetPowerupData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerGetPowerupData
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerGetPowerupData;

        /**
         * Creates a plain object from a PlayerGetPowerupData message. Also converts values to other types if specified.
         * @param message PlayerGetPowerupData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerGetPowerupData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerGetPowerupData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerGetPowerupData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerPlantBombData. */
    interface IPlayerPlantBombData {

        /** PlayerPlantBombData userId */
        userId?: (number|null);

        /** PlayerPlantBombData x */
        x?: (number|null);

        /** PlayerPlantBombData y */
        y?: (number|null);
    }

    /** Represents a PlayerPlantBombData. */
    class PlayerPlantBombData implements IPlayerPlantBombData {

        /**
         * Constructs a new PlayerPlantBombData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerPlantBombData);

        /** PlayerPlantBombData userId. */
        public userId: number;

        /** PlayerPlantBombData x. */
        public x: number;

        /** PlayerPlantBombData y. */
        public y: number;

        /**
         * Creates a new PlayerPlantBombData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerPlantBombData instance
         */
        public static create(properties?: common.IPlayerPlantBombData): common.PlayerPlantBombData;

        /**
         * Encodes the specified PlayerPlantBombData message. Does not implicitly {@link common.PlayerPlantBombData.verify|verify} messages.
         * @param message PlayerPlantBombData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerPlantBombData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerPlantBombData message, length delimited. Does not implicitly {@link common.PlayerPlantBombData.verify|verify} messages.
         * @param message PlayerPlantBombData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerPlantBombData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerPlantBombData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerPlantBombData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerPlantBombData;

        /**
         * Decodes a PlayerPlantBombData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerPlantBombData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerPlantBombData;

        /**
         * Verifies a PlayerPlantBombData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerPlantBombData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerPlantBombData
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerPlantBombData;

        /**
         * Creates a plain object from a PlayerPlantBombData message. Also converts values to other types if specified.
         * @param message PlayerPlantBombData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerPlantBombData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerPlantBombData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerPlantBombData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerMovedData. */
    interface IPlayerMovedData {

        /** PlayerMovedData userId */
        userId?: (number|null);

        /** PlayerMovedData x */
        x?: (number|null);

        /** PlayerMovedData y */
        y?: (number|null);
    }

    /** Represents a PlayerMovedData. */
    class PlayerMovedData implements IPlayerMovedData {

        /**
         * Constructs a new PlayerMovedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerMovedData);

        /** PlayerMovedData userId. */
        public userId: number;

        /** PlayerMovedData x. */
        public x: number;

        /** PlayerMovedData y. */
        public y: number;

        /**
         * Creates a new PlayerMovedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerMovedData instance
         */
        public static create(properties?: common.IPlayerMovedData): common.PlayerMovedData;

        /**
         * Encodes the specified PlayerMovedData message. Does not implicitly {@link common.PlayerMovedData.verify|verify} messages.
         * @param message PlayerMovedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerMovedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerMovedData message, length delimited. Does not implicitly {@link common.PlayerMovedData.verify|verify} messages.
         * @param message PlayerMovedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerMovedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerMovedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerMovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerMovedData;

        /**
         * Decodes a PlayerMovedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerMovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerMovedData;

        /**
         * Verifies a PlayerMovedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerMovedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerMovedData
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerMovedData;

        /**
         * Creates a plain object from a PlayerMovedData message. Also converts values to other types if specified.
         * @param message PlayerMovedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerMovedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerMovedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerMovedData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerDeadData. */
    interface IPlayerDeadData {

        /** PlayerDeadData userId */
        userId?: (number|null);
    }

    /** Represents a PlayerDeadData. */
    class PlayerDeadData implements IPlayerDeadData {

        /**
         * Constructs a new PlayerDeadData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerDeadData);

        /** PlayerDeadData userId. */
        public userId: number;

        /**
         * Creates a new PlayerDeadData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerDeadData instance
         */
        public static create(properties?: common.IPlayerDeadData): common.PlayerDeadData;

        /**
         * Encodes the specified PlayerDeadData message. Does not implicitly {@link common.PlayerDeadData.verify|verify} messages.
         * @param message PlayerDeadData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerDeadData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerDeadData message, length delimited. Does not implicitly {@link common.PlayerDeadData.verify|verify} messages.
         * @param message PlayerDeadData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerDeadData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerDeadData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerDeadData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerDeadData;

        /**
         * Decodes a PlayerDeadData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerDeadData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerDeadData;

        /**
         * Verifies a PlayerDeadData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerDeadData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerDeadData
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerDeadData;

        /**
         * Creates a plain object from a PlayerDeadData message. Also converts values to other types if specified.
         * @param message PlayerDeadData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerDeadData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerDeadData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerDeadData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BombPlantedData. */
    interface IBombPlantedData {

        /** BombPlantedData x */
        x?: (number|null);

        /** BombPlantedData y */
        y?: (number|null);

        /** BombPlantedData explodedAt */
        explodedAt?: (number|Long|null);

        /** BombPlantedData userId */
        userId?: (number|null);

        /** BombPlantedData userBombcount */
        userBombcount?: (number|null);
    }

    /** Represents a BombPlantedData. */
    class BombPlantedData implements IBombPlantedData {

        /**
         * Constructs a new BombPlantedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IBombPlantedData);

        /** BombPlantedData x. */
        public x: number;

        /** BombPlantedData y. */
        public y: number;

        /** BombPlantedData explodedAt. */
        public explodedAt: (number|Long);

        /** BombPlantedData userId. */
        public userId: number;

        /** BombPlantedData userBombcount. */
        public userBombcount: number;

        /**
         * Creates a new BombPlantedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BombPlantedData instance
         */
        public static create(properties?: common.IBombPlantedData): common.BombPlantedData;

        /**
         * Encodes the specified BombPlantedData message. Does not implicitly {@link common.BombPlantedData.verify|verify} messages.
         * @param message BombPlantedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IBombPlantedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BombPlantedData message, length delimited. Does not implicitly {@link common.BombPlantedData.verify|verify} messages.
         * @param message BombPlantedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IBombPlantedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BombPlantedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BombPlantedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.BombPlantedData;

        /**
         * Decodes a BombPlantedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BombPlantedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.BombPlantedData;

        /**
         * Verifies a BombPlantedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BombPlantedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BombPlantedData
         */
        public static fromObject(object: { [k: string]: any }): common.BombPlantedData;

        /**
         * Creates a plain object from a BombPlantedData message. Also converts values to other types if specified.
         * @param message BombPlantedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.BombPlantedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BombPlantedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BombPlantedData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BombWillExplodeData. */
    interface IBombWillExplodeData {

        /** BombWillExplodeData x */
        x?: (number|null);

        /** BombWillExplodeData y */
        y?: (number|null);

        /** BombWillExplodeData bombFirepower */
        bombFirepower?: (number|null);

        /** BombWillExplodeData userId */
        userId?: (number|null);
    }

    /** Represents a BombWillExplodeData. */
    class BombWillExplodeData implements IBombWillExplodeData {

        /**
         * Constructs a new BombWillExplodeData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IBombWillExplodeData);

        /** BombWillExplodeData x. */
        public x: number;

        /** BombWillExplodeData y. */
        public y: number;

        /** BombWillExplodeData bombFirepower. */
        public bombFirepower: number;

        /** BombWillExplodeData userId. */
        public userId: number;

        /**
         * Creates a new BombWillExplodeData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BombWillExplodeData instance
         */
        public static create(properties?: common.IBombWillExplodeData): common.BombWillExplodeData;

        /**
         * Encodes the specified BombWillExplodeData message. Does not implicitly {@link common.BombWillExplodeData.verify|verify} messages.
         * @param message BombWillExplodeData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IBombWillExplodeData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BombWillExplodeData message, length delimited. Does not implicitly {@link common.BombWillExplodeData.verify|verify} messages.
         * @param message BombWillExplodeData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IBombWillExplodeData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BombWillExplodeData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BombWillExplodeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.BombWillExplodeData;

        /**
         * Decodes a BombWillExplodeData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BombWillExplodeData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.BombWillExplodeData;

        /**
         * Verifies a BombWillExplodeData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BombWillExplodeData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BombWillExplodeData
         */
        public static fromObject(object: { [k: string]: any }): common.BombWillExplodeData;

        /**
         * Creates a plain object from a BombWillExplodeData message. Also converts values to other types if specified.
         * @param message BombWillExplodeData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.BombWillExplodeData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BombWillExplodeData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BombWillExplodeData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BombExplodedData. */
    interface IBombExplodedData {

        /** BombExplodedData x */
        x?: (number|null);

        /** BombExplodedData y */
        y?: (number|null);

        /** BombExplodedData bombFirepower */
        bombFirepower?: (number|null);

        /** BombExplodedData userId */
        userId?: (number|null);

        /** BombExplodedData userBombcount */
        userBombcount?: (number|null);
    }

    /** Represents a BombExplodedData. */
    class BombExplodedData implements IBombExplodedData {

        /**
         * Constructs a new BombExplodedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IBombExplodedData);

        /** BombExplodedData x. */
        public x: number;

        /** BombExplodedData y. */
        public y: number;

        /** BombExplodedData bombFirepower. */
        public bombFirepower: number;

        /** BombExplodedData userId. */
        public userId: number;

        /** BombExplodedData userBombcount. */
        public userBombcount: number;

        /**
         * Creates a new BombExplodedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BombExplodedData instance
         */
        public static create(properties?: common.IBombExplodedData): common.BombExplodedData;

        /**
         * Encodes the specified BombExplodedData message. Does not implicitly {@link common.BombExplodedData.verify|verify} messages.
         * @param message BombExplodedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IBombExplodedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BombExplodedData message, length delimited. Does not implicitly {@link common.BombExplodedData.verify|verify} messages.
         * @param message BombExplodedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IBombExplodedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BombExplodedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BombExplodedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.BombExplodedData;

        /**
         * Decodes a BombExplodedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BombExplodedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.BombExplodedData;

        /**
         * Verifies a BombExplodedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BombExplodedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BombExplodedData
         */
        public static fromObject(object: { [k: string]: any }): common.BombExplodedData;

        /**
         * Creates a plain object from a BombExplodedData message. Also converts values to other types if specified.
         * @param message BombExplodedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.BombExplodedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BombExplodedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BombExplodedData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a BoxRemovedData. */
    interface IBoxRemovedData {

        /** BoxRemovedData x */
        x?: (number|null);

        /** BoxRemovedData y */
        y?: (number|null);
    }

    /** Represents a BoxRemovedData. */
    class BoxRemovedData implements IBoxRemovedData {

        /**
         * Constructs a new BoxRemovedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IBoxRemovedData);

        /** BoxRemovedData x. */
        public x: number;

        /** BoxRemovedData y. */
        public y: number;

        /**
         * Creates a new BoxRemovedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BoxRemovedData instance
         */
        public static create(properties?: common.IBoxRemovedData): common.BoxRemovedData;

        /**
         * Encodes the specified BoxRemovedData message. Does not implicitly {@link common.BoxRemovedData.verify|verify} messages.
         * @param message BoxRemovedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IBoxRemovedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BoxRemovedData message, length delimited. Does not implicitly {@link common.BoxRemovedData.verify|verify} messages.
         * @param message BoxRemovedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IBoxRemovedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BoxRemovedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BoxRemovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.BoxRemovedData;

        /**
         * Decodes a BoxRemovedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BoxRemovedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.BoxRemovedData;

        /**
         * Verifies a BoxRemovedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BoxRemovedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BoxRemovedData
         */
        public static fromObject(object: { [k: string]: any }): common.BoxRemovedData;

        /**
         * Creates a plain object from a BoxRemovedData message. Also converts values to other types if specified.
         * @param message BoxRemovedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.BoxRemovedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BoxRemovedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BoxRemovedData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PowerupDroppedData. */
    interface IPowerupDroppedData {

        /** PowerupDroppedData x */
        x?: (number|null);

        /** PowerupDroppedData y */
        y?: (number|null);

        /** PowerupDroppedData type */
        type?: (common.PowerupType|null);
    }

    /** Represents a PowerupDroppedData. */
    class PowerupDroppedData implements IPowerupDroppedData {

        /**
         * Constructs a new PowerupDroppedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPowerupDroppedData);

        /** PowerupDroppedData x. */
        public x: number;

        /** PowerupDroppedData y. */
        public y: number;

        /** PowerupDroppedData type. */
        public type: common.PowerupType;

        /**
         * Creates a new PowerupDroppedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PowerupDroppedData instance
         */
        public static create(properties?: common.IPowerupDroppedData): common.PowerupDroppedData;

        /**
         * Encodes the specified PowerupDroppedData message. Does not implicitly {@link common.PowerupDroppedData.verify|verify} messages.
         * @param message PowerupDroppedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPowerupDroppedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PowerupDroppedData message, length delimited. Does not implicitly {@link common.PowerupDroppedData.verify|verify} messages.
         * @param message PowerupDroppedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPowerupDroppedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PowerupDroppedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PowerupDroppedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PowerupDroppedData;

        /**
         * Decodes a PowerupDroppedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PowerupDroppedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PowerupDroppedData;

        /**
         * Verifies a PowerupDroppedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PowerupDroppedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PowerupDroppedData
         */
        public static fromObject(object: { [k: string]: any }): common.PowerupDroppedData;

        /**
         * Creates a plain object from a PowerupDroppedData message. Also converts values to other types if specified.
         * @param message PowerupDroppedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PowerupDroppedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PowerupDroppedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PowerupDroppedData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PowerupConsumedData. */
    interface IPowerupConsumedData {

        /** PowerupConsumedData userId */
        userId?: (number|null);

        /** PowerupConsumedData x */
        x?: (number|null);

        /** PowerupConsumedData y */
        y?: (number|null);

        /** PowerupConsumedData type */
        type?: (common.PowerupType|null);

        /** PowerupConsumedData userBombcount */
        userBombcount?: (number|null);

        /** PowerupConsumedData userFirepower */
        userFirepower?: (number|null);
    }

    /** Represents a PowerupConsumedData. */
    class PowerupConsumedData implements IPowerupConsumedData {

        /**
         * Constructs a new PowerupConsumedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPowerupConsumedData);

        /** PowerupConsumedData userId. */
        public userId: number;

        /** PowerupConsumedData x. */
        public x: number;

        /** PowerupConsumedData y. */
        public y: number;

        /** PowerupConsumedData type. */
        public type: common.PowerupType;

        /** PowerupConsumedData userBombcount. */
        public userBombcount: number;

        /** PowerupConsumedData userFirepower. */
        public userFirepower: number;

        /**
         * Creates a new PowerupConsumedData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PowerupConsumedData instance
         */
        public static create(properties?: common.IPowerupConsumedData): common.PowerupConsumedData;

        /**
         * Encodes the specified PowerupConsumedData message. Does not implicitly {@link common.PowerupConsumedData.verify|verify} messages.
         * @param message PowerupConsumedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPowerupConsumedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PowerupConsumedData message, length delimited. Does not implicitly {@link common.PowerupConsumedData.verify|verify} messages.
         * @param message PowerupConsumedData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPowerupConsumedData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PowerupConsumedData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PowerupConsumedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PowerupConsumedData;

        /**
         * Decodes a PowerupConsumedData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PowerupConsumedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PowerupConsumedData;

        /**
         * Verifies a PowerupConsumedData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PowerupConsumedData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PowerupConsumedData
         */
        public static fromObject(object: { [k: string]: any }): common.PowerupConsumedData;

        /**
         * Creates a plain object from a PowerupConsumedData message. Also converts values to other types if specified.
         * @param message PowerupConsumedData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PowerupConsumedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PowerupConsumedData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PowerupConsumedData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerPropertyDto. */
    interface IPlayerPropertyDto {

        /** PlayerPropertyDto userId */
        userId?: (number|null);

        /** PlayerPropertyDto x */
        x?: (number|null);

        /** PlayerPropertyDto y */
        y?: (number|null);

        /** PlayerPropertyDto firepower */
        firepower?: (number|null);

        /** PlayerPropertyDto bombcount */
        bombcount?: (number|null);

        /** PlayerPropertyDto nickname */
        nickname?: (string|null);
    }

    /** Represents a PlayerPropertyDto. */
    class PlayerPropertyDto implements IPlayerPropertyDto {

        /**
         * Constructs a new PlayerPropertyDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerPropertyDto);

        /** PlayerPropertyDto userId. */
        public userId: number;

        /** PlayerPropertyDto x. */
        public x: number;

        /** PlayerPropertyDto y. */
        public y: number;

        /** PlayerPropertyDto firepower. */
        public firepower: number;

        /** PlayerPropertyDto bombcount. */
        public bombcount: number;

        /** PlayerPropertyDto nickname. */
        public nickname: string;

        /**
         * Creates a new PlayerPropertyDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerPropertyDto instance
         */
        public static create(properties?: common.IPlayerPropertyDto): common.PlayerPropertyDto;

        /**
         * Encodes the specified PlayerPropertyDto message. Does not implicitly {@link common.PlayerPropertyDto.verify|verify} messages.
         * @param message PlayerPropertyDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPlayerPropertyDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerPropertyDto message, length delimited. Does not implicitly {@link common.PlayerPropertyDto.verify|verify} messages.
         * @param message PlayerPropertyDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPlayerPropertyDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerPropertyDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerPropertyDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PlayerPropertyDto;

        /**
         * Decodes a PlayerPropertyDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerPropertyDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PlayerPropertyDto;

        /**
         * Verifies a PlayerPropertyDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerPropertyDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerPropertyDto
         */
        public static fromObject(object: { [k: string]: any }): common.PlayerPropertyDto;

        /**
         * Creates a plain object from a PlayerPropertyDto message. Also converts values to other types if specified.
         * @param message PlayerPropertyDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PlayerPropertyDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerPropertyDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerPropertyDto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TileDto. */
    interface ITileDto {

        /** TileDto obstacle */
        obstacle?: (common.IObstacleDto|null);

        /** TileDto decoration */
        decoration?: (common.IDecorationDto|null);

        /** TileDto powerup */
        powerup?: (common.IPowerupDto|null);
    }

    /** Represents a TileDto. */
    class TileDto implements ITileDto {

        /**
         * Constructs a new TileDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.ITileDto);

        /** TileDto obstacle. */
        public obstacle?: (common.IObstacleDto|null);

        /** TileDto decoration. */
        public decoration?: (common.IDecorationDto|null);

        /** TileDto powerup. */
        public powerup?: (common.IPowerupDto|null);

        /**
         * Creates a new TileDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TileDto instance
         */
        public static create(properties?: common.ITileDto): common.TileDto;

        /**
         * Encodes the specified TileDto message. Does not implicitly {@link common.TileDto.verify|verify} messages.
         * @param message TileDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.ITileDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TileDto message, length delimited. Does not implicitly {@link common.TileDto.verify|verify} messages.
         * @param message TileDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.ITileDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TileDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TileDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.TileDto;

        /**
         * Decodes a TileDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TileDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.TileDto;

        /**
         * Verifies a TileDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TileDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TileDto
         */
        public static fromObject(object: { [k: string]: any }): common.TileDto;

        /**
         * Creates a plain object from a TileDto message. Also converts values to other types if specified.
         * @param message TileDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.TileDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TileDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TileDto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ObstacleDto. */
    interface IObstacleDto {

        /** ObstacleDto type */
        type?: (common.ObstacleType|null);
    }

    /** Represents an ObstacleDto. */
    class ObstacleDto implements IObstacleDto {

        /**
         * Constructs a new ObstacleDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IObstacleDto);

        /** ObstacleDto type. */
        public type: common.ObstacleType;

        /**
         * Creates a new ObstacleDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ObstacleDto instance
         */
        public static create(properties?: common.IObstacleDto): common.ObstacleDto;

        /**
         * Encodes the specified ObstacleDto message. Does not implicitly {@link common.ObstacleDto.verify|verify} messages.
         * @param message ObstacleDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IObstacleDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ObstacleDto message, length delimited. Does not implicitly {@link common.ObstacleDto.verify|verify} messages.
         * @param message ObstacleDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IObstacleDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ObstacleDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ObstacleDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.ObstacleDto;

        /**
         * Decodes an ObstacleDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ObstacleDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.ObstacleDto;

        /**
         * Verifies an ObstacleDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ObstacleDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ObstacleDto
         */
        public static fromObject(object: { [k: string]: any }): common.ObstacleDto;

        /**
         * Creates a plain object from an ObstacleDto message. Also converts values to other types if specified.
         * @param message ObstacleDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.ObstacleDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ObstacleDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ObstacleDto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DecorationDto. */
    interface IDecorationDto {

        /** DecorationDto type */
        type?: (common.DecorationType|null);
    }

    /** Represents a DecorationDto. */
    class DecorationDto implements IDecorationDto {

        /**
         * Constructs a new DecorationDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IDecorationDto);

        /** DecorationDto type. */
        public type: common.DecorationType;

        /**
         * Creates a new DecorationDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecorationDto instance
         */
        public static create(properties?: common.IDecorationDto): common.DecorationDto;

        /**
         * Encodes the specified DecorationDto message. Does not implicitly {@link common.DecorationDto.verify|verify} messages.
         * @param message DecorationDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IDecorationDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DecorationDto message, length delimited. Does not implicitly {@link common.DecorationDto.verify|verify} messages.
         * @param message DecorationDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IDecorationDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DecorationDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DecorationDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.DecorationDto;

        /**
         * Decodes a DecorationDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DecorationDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.DecorationDto;

        /**
         * Verifies a DecorationDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DecorationDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DecorationDto
         */
        public static fromObject(object: { [k: string]: any }): common.DecorationDto;

        /**
         * Creates a plain object from a DecorationDto message. Also converts values to other types if specified.
         * @param message DecorationDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.DecorationDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DecorationDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DecorationDto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PowerupDto. */
    interface IPowerupDto {

        /** PowerupDto type */
        type?: (common.PowerupType|null);
    }

    /** Represents a PowerupDto. */
    class PowerupDto implements IPowerupDto {

        /**
         * Constructs a new PowerupDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPowerupDto);

        /** PowerupDto type. */
        public type: common.PowerupType;

        /**
         * Creates a new PowerupDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PowerupDto instance
         */
        public static create(properties?: common.IPowerupDto): common.PowerupDto;

        /**
         * Encodes the specified PowerupDto message. Does not implicitly {@link common.PowerupDto.verify|verify} messages.
         * @param message PowerupDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IPowerupDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PowerupDto message, length delimited. Does not implicitly {@link common.PowerupDto.verify|verify} messages.
         * @param message PowerupDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IPowerupDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PowerupDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PowerupDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.PowerupDto;

        /**
         * Decodes a PowerupDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PowerupDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.PowerupDto;

        /**
         * Verifies a PowerupDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PowerupDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PowerupDto
         */
        public static fromObject(object: { [k: string]: any }): common.PowerupDto;

        /**
         * Creates a plain object from a PowerupDto message. Also converts values to other types if specified.
         * @param message PowerupDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.PowerupDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PowerupDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PowerupDto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** ObstacleType enum. */
    enum ObstacleType {
        Box = 0,
        House = 1,
        Tree = 2,
        Bomb = 3
    }

    /** DecorationType enum. */
    enum DecorationType {
        Bush = 0
    }

    /** PowerupType enum. */
    enum PowerupType {
        MoreBomb = 0,
        MoreFire = 1
    }
}

/** Namespace auth. */
export namespace auth {

    /** Represents an AuthService */
    class AuthService extends $protobuf.rpc.Service {

        /**
         * Constructs a new AuthService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new AuthService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): AuthService;

        /**
         * Calls Register.
         * @param request RegisterRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and RegisterResponse
         */
        public register(request: auth.IRegisterRequest, callback: auth.AuthService.RegisterCallback): void;

        /**
         * Calls Register.
         * @param request RegisterRequest message or plain object
         * @returns Promise
         */
        public register(request: auth.IRegisterRequest): Promise<auth.RegisterResponse>;

        /**
         * Calls Validate.
         * @param request ValidateRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and PlayerInfoDto
         */
        public validate(request: auth.IValidateRequest, callback: auth.AuthService.ValidateCallback): void;

        /**
         * Calls Validate.
         * @param request ValidateRequest message or plain object
         * @returns Promise
         */
        public validate(request: auth.IValidateRequest): Promise<auth.PlayerInfoDto>;

        /**
         * Calls GetNickname.
         * @param request GetNicknameRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetNicknameResponse
         */
        public getNickname(request: auth.IGetNicknameRequest, callback: auth.AuthService.GetNicknameCallback): void;

        /**
         * Calls GetNickname.
         * @param request GetNicknameRequest message or plain object
         * @returns Promise
         */
        public getNickname(request: auth.IGetNicknameRequest): Promise<auth.GetNicknameResponse>;
    }

    namespace AuthService {

        /**
         * Callback as used by {@link auth.AuthService#register}.
         * @param error Error, if any
         * @param [response] RegisterResponse
         */
        type RegisterCallback = (error: (Error|null), response?: auth.RegisterResponse) => void;

        /**
         * Callback as used by {@link auth.AuthService#validate}.
         * @param error Error, if any
         * @param [response] PlayerInfoDto
         */
        type ValidateCallback = (error: (Error|null), response?: auth.PlayerInfoDto) => void;

        /**
         * Callback as used by {@link auth.AuthService#getNickname}.
         * @param error Error, if any
         * @param [response] GetNicknameResponse
         */
        type GetNicknameCallback = (error: (Error|null), response?: auth.GetNicknameResponse) => void;
    }

    /** Properties of a RegisterRequest. */
    interface IRegisterRequest {

        /** RegisterRequest nickname */
        nickname?: (string|null);
    }

    /** Represents a RegisterRequest. */
    class RegisterRequest implements IRegisterRequest {

        /**
         * Constructs a new RegisterRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IRegisterRequest);

        /** RegisterRequest nickname. */
        public nickname: string;

        /**
         * Creates a new RegisterRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterRequest instance
         */
        public static create(properties?: auth.IRegisterRequest): auth.RegisterRequest;

        /**
         * Encodes the specified RegisterRequest message. Does not implicitly {@link auth.RegisterRequest.verify|verify} messages.
         * @param message RegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link auth.RegisterRequest.verify|verify} messages.
         * @param message RegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.RegisterRequest;

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.RegisterRequest;

        /**
         * Verifies a RegisterRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterRequest
         */
        public static fromObject(object: { [k: string]: any }): auth.RegisterRequest;

        /**
         * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
         * @param message RegisterRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.RegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RegisterRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RegisterResponse. */
    interface IRegisterResponse {

        /** RegisterResponse apiKey */
        apiKey?: (string|null);

        /** RegisterResponse player */
        player?: (auth.IPlayerInfoDto|null);
    }

    /** Represents a RegisterResponse. */
    class RegisterResponse implements IRegisterResponse {

        /**
         * Constructs a new RegisterResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IRegisterResponse);

        /** RegisterResponse apiKey. */
        public apiKey: string;

        /** RegisterResponse player. */
        public player?: (auth.IPlayerInfoDto|null);

        /**
         * Creates a new RegisterResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterResponse instance
         */
        public static create(properties?: auth.IRegisterResponse): auth.RegisterResponse;

        /**
         * Encodes the specified RegisterResponse message. Does not implicitly {@link auth.RegisterResponse.verify|verify} messages.
         * @param message RegisterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link auth.RegisterResponse.verify|verify} messages.
         * @param message RegisterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.RegisterResponse;

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.RegisterResponse;

        /**
         * Verifies a RegisterResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterResponse
         */
        public static fromObject(object: { [k: string]: any }): auth.RegisterResponse;

        /**
         * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
         * @param message RegisterResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.RegisterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RegisterResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ValidateRequest. */
    interface IValidateRequest {

        /** ValidateRequest apiKey */
        apiKey?: (string|null);
    }

    /** Represents a ValidateRequest. */
    class ValidateRequest implements IValidateRequest {

        /**
         * Constructs a new ValidateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IValidateRequest);

        /** ValidateRequest apiKey. */
        public apiKey: string;

        /**
         * Creates a new ValidateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValidateRequest instance
         */
        public static create(properties?: auth.IValidateRequest): auth.ValidateRequest;

        /**
         * Encodes the specified ValidateRequest message. Does not implicitly {@link auth.ValidateRequest.verify|verify} messages.
         * @param message ValidateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IValidateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ValidateRequest message, length delimited. Does not implicitly {@link auth.ValidateRequest.verify|verify} messages.
         * @param message ValidateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IValidateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ValidateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.ValidateRequest;

        /**
         * Decodes a ValidateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.ValidateRequest;

        /**
         * Verifies a ValidateRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ValidateRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ValidateRequest
         */
        public static fromObject(object: { [k: string]: any }): auth.ValidateRequest;

        /**
         * Creates a plain object from a ValidateRequest message. Also converts values to other types if specified.
         * @param message ValidateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.ValidateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ValidateRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ValidateRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetNicknameRequest. */
    interface IGetNicknameRequest {

        /** GetNicknameRequest players */
        players?: (number[]|null);
    }

    /** Represents a GetNicknameRequest. */
    class GetNicknameRequest implements IGetNicknameRequest {

        /**
         * Constructs a new GetNicknameRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IGetNicknameRequest);

        /** GetNicknameRequest players. */
        public players: number[];

        /**
         * Creates a new GetNicknameRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetNicknameRequest instance
         */
        public static create(properties?: auth.IGetNicknameRequest): auth.GetNicknameRequest;

        /**
         * Encodes the specified GetNicknameRequest message. Does not implicitly {@link auth.GetNicknameRequest.verify|verify} messages.
         * @param message GetNicknameRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IGetNicknameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetNicknameRequest message, length delimited. Does not implicitly {@link auth.GetNicknameRequest.verify|verify} messages.
         * @param message GetNicknameRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IGetNicknameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetNicknameRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetNicknameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.GetNicknameRequest;

        /**
         * Decodes a GetNicknameRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetNicknameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.GetNicknameRequest;

        /**
         * Verifies a GetNicknameRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetNicknameRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetNicknameRequest
         */
        public static fromObject(object: { [k: string]: any }): auth.GetNicknameRequest;

        /**
         * Creates a plain object from a GetNicknameRequest message. Also converts values to other types if specified.
         * @param message GetNicknameRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.GetNicknameRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetNicknameRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetNicknameRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetNicknameResponse. */
    interface IGetNicknameResponse {

        /** GetNicknameResponse nicknames */
        nicknames?: ({ [k: string]: string }|null);
    }

    /** Represents a GetNicknameResponse. */
    class GetNicknameResponse implements IGetNicknameResponse {

        /**
         * Constructs a new GetNicknameResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IGetNicknameResponse);

        /** GetNicknameResponse nicknames. */
        public nicknames: { [k: string]: string };

        /**
         * Creates a new GetNicknameResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetNicknameResponse instance
         */
        public static create(properties?: auth.IGetNicknameResponse): auth.GetNicknameResponse;

        /**
         * Encodes the specified GetNicknameResponse message. Does not implicitly {@link auth.GetNicknameResponse.verify|verify} messages.
         * @param message GetNicknameResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IGetNicknameResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetNicknameResponse message, length delimited. Does not implicitly {@link auth.GetNicknameResponse.verify|verify} messages.
         * @param message GetNicknameResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IGetNicknameResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetNicknameResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetNicknameResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.GetNicknameResponse;

        /**
         * Decodes a GetNicknameResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetNicknameResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.GetNicknameResponse;

        /**
         * Verifies a GetNicknameResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetNicknameResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetNicknameResponse
         */
        public static fromObject(object: { [k: string]: any }): auth.GetNicknameResponse;

        /**
         * Creates a plain object from a GetNicknameResponse message. Also converts values to other types if specified.
         * @param message GetNicknameResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.GetNicknameResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetNicknameResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetNicknameResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerInfoDto. */
    interface IPlayerInfoDto {

        /** PlayerInfoDto userId */
        userId?: (number|null);

        /** PlayerInfoDto nickname */
        nickname?: (string|null);
    }

    /** Represents a PlayerInfoDto. */
    class PlayerInfoDto implements IPlayerInfoDto {

        /**
         * Constructs a new PlayerInfoDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IPlayerInfoDto);

        /** PlayerInfoDto userId. */
        public userId: number;

        /** PlayerInfoDto nickname. */
        public nickname: string;

        /**
         * Creates a new PlayerInfoDto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfoDto instance
         */
        public static create(properties?: auth.IPlayerInfoDto): auth.PlayerInfoDto;

        /**
         * Encodes the specified PlayerInfoDto message. Does not implicitly {@link auth.PlayerInfoDto.verify|verify} messages.
         * @param message PlayerInfoDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: auth.IPlayerInfoDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfoDto message, length delimited. Does not implicitly {@link auth.PlayerInfoDto.verify|verify} messages.
         * @param message PlayerInfoDto message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: auth.IPlayerInfoDto, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfoDto message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfoDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.PlayerInfoDto;

        /**
         * Decodes a PlayerInfoDto message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfoDto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auth.PlayerInfoDto;

        /**
         * Verifies a PlayerInfoDto message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfoDto message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfoDto
         */
        public static fromObject(object: { [k: string]: any }): auth.PlayerInfoDto;

        /**
         * Creates a plain object from a PlayerInfoDto message. Also converts values to other types if specified.
         * @param message PlayerInfoDto
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: auth.PlayerInfoDto, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfoDto to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerInfoDto
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace matchmaking. */
export namespace matchmaking {

    /** Represents a MatchmakingService */
    class MatchmakingService extends $protobuf.rpc.Service {

        /**
         * Constructs a new MatchmakingService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new MatchmakingService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MatchmakingService;

        /**
         * Calls Enroll.
         * @param request MatchmakingRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public enroll(request: matchmaking.IMatchmakingRequest, callback: matchmaking.MatchmakingService.EnrollCallback): void;

        /**
         * Calls Enroll.
         * @param request MatchmakingRequest message or plain object
         * @returns Promise
         */
        public enroll(request: matchmaking.IMatchmakingRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls Cancel.
         * @param request MatchmakingRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public cancel(request: matchmaking.IMatchmakingRequest, callback: matchmaking.MatchmakingService.CancelCallback): void;

        /**
         * Calls Cancel.
         * @param request MatchmakingRequest message or plain object
         * @returns Promise
         */
        public cancel(request: matchmaking.IMatchmakingRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetWaitingPlayerCount.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and GetWaitingPlayerCountResponse
         */
        public getWaitingPlayerCount(request: google.protobuf.IEmpty, callback: matchmaking.MatchmakingService.GetWaitingPlayerCountCallback): void;

        /**
         * Calls GetWaitingPlayerCount.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public getWaitingPlayerCount(request: google.protobuf.IEmpty): Promise<matchmaking.GetWaitingPlayerCountResponse>;

        /**
         * Calls SubscribeMatch.
         * @param request MatchmakingRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Event
         */
        public subscribeMatch(request: matchmaking.IMatchmakingRequest, callback: matchmaking.MatchmakingService.SubscribeMatchCallback): void;

        /**
         * Calls SubscribeMatch.
         * @param request MatchmakingRequest message or plain object
         * @returns Promise
         */
        public subscribeMatch(request: matchmaking.IMatchmakingRequest): Promise<common.Event>;
    }

    namespace MatchmakingService {

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#enroll}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type EnrollCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#cancel}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type CancelCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#getWaitingPlayerCount}.
         * @param error Error, if any
         * @param [response] GetWaitingPlayerCountResponse
         */
        type GetWaitingPlayerCountCallback = (error: (Error|null), response?: matchmaking.GetWaitingPlayerCountResponse) => void;

        /**
         * Callback as used by {@link matchmaking.MatchmakingService#subscribeMatch}.
         * @param error Error, if any
         * @param [response] Event
         */
        type SubscribeMatchCallback = (error: (Error|null), response?: common.Event) => void;
    }

    /** Properties of a MatchmakingRequest. */
    interface IMatchmakingRequest {

        /** MatchmakingRequest userId */
        userId?: (number|null);
    }

    /** Represents a MatchmakingRequest. */
    class MatchmakingRequest implements IMatchmakingRequest {

        /**
         * Constructs a new MatchmakingRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: matchmaking.IMatchmakingRequest);

        /** MatchmakingRequest userId. */
        public userId: number;

        /**
         * Creates a new MatchmakingRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchmakingRequest instance
         */
        public static create(properties?: matchmaking.IMatchmakingRequest): matchmaking.MatchmakingRequest;

        /**
         * Encodes the specified MatchmakingRequest message. Does not implicitly {@link matchmaking.MatchmakingRequest.verify|verify} messages.
         * @param message MatchmakingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: matchmaking.IMatchmakingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchmakingRequest message, length delimited. Does not implicitly {@link matchmaking.MatchmakingRequest.verify|verify} messages.
         * @param message MatchmakingRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: matchmaking.IMatchmakingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchmakingRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchmakingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): matchmaking.MatchmakingRequest;

        /**
         * Decodes a MatchmakingRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchmakingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): matchmaking.MatchmakingRequest;

        /**
         * Verifies a MatchmakingRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchmakingRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchmakingRequest
         */
        public static fromObject(object: { [k: string]: any }): matchmaking.MatchmakingRequest;

        /**
         * Creates a plain object from a MatchmakingRequest message. Also converts values to other types if specified.
         * @param message MatchmakingRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: matchmaking.MatchmakingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchmakingRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchmakingRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetWaitingPlayerCountResponse. */
    interface IGetWaitingPlayerCountResponse {

        /** GetWaitingPlayerCountResponse count */
        count?: (number|null);
    }

    /** Represents a GetWaitingPlayerCountResponse. */
    class GetWaitingPlayerCountResponse implements IGetWaitingPlayerCountResponse {

        /**
         * Constructs a new GetWaitingPlayerCountResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: matchmaking.IGetWaitingPlayerCountResponse);

        /** GetWaitingPlayerCountResponse count. */
        public count: number;

        /**
         * Creates a new GetWaitingPlayerCountResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetWaitingPlayerCountResponse instance
         */
        public static create(properties?: matchmaking.IGetWaitingPlayerCountResponse): matchmaking.GetWaitingPlayerCountResponse;

        /**
         * Encodes the specified GetWaitingPlayerCountResponse message. Does not implicitly {@link matchmaking.GetWaitingPlayerCountResponse.verify|verify} messages.
         * @param message GetWaitingPlayerCountResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: matchmaking.IGetWaitingPlayerCountResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetWaitingPlayerCountResponse message, length delimited. Does not implicitly {@link matchmaking.GetWaitingPlayerCountResponse.verify|verify} messages.
         * @param message GetWaitingPlayerCountResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: matchmaking.IGetWaitingPlayerCountResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetWaitingPlayerCountResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetWaitingPlayerCountResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): matchmaking.GetWaitingPlayerCountResponse;

        /**
         * Decodes a GetWaitingPlayerCountResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetWaitingPlayerCountResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): matchmaking.GetWaitingPlayerCountResponse;

        /**
         * Verifies a GetWaitingPlayerCountResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetWaitingPlayerCountResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetWaitingPlayerCountResponse
         */
        public static fromObject(object: { [k: string]: any }): matchmaking.GetWaitingPlayerCountResponse;

        /**
         * Creates a plain object from a GetWaitingPlayerCountResponse message. Also converts values to other types if specified.
         * @param message GetWaitingPlayerCountResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: matchmaking.GetWaitingPlayerCountResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetWaitingPlayerCountResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetWaitingPlayerCountResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Empty
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}

/** Namespace game. */
export namespace game {

    /** Represents a GameService */
    class GameService extends $protobuf.rpc.Service {

        /**
         * Constructs a new GameService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new GameService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): GameService;

        /**
         * Calls NewGame.
         * @param request NewGameRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public newGame(request: game.INewGameRequest, callback: game.GameService.NewGameCallback): void;

        /**
         * Calls NewGame.
         * @param request NewGameRequest message or plain object
         * @returns Promise
         */
        public newGame(request: game.INewGameRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetGameInfo.
         * @param request GetGameInfoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetGameInfoResponse
         */
        public getGameInfo(request: game.IGetGameInfoRequest, callback: game.GameService.GetGameInfoCallback): void;

        /**
         * Calls GetGameInfo.
         * @param request GetGameInfoRequest message or plain object
         * @returns Promise
         */
        public getGameInfo(request: game.IGetGameInfoRequest): Promise<game.GetGameInfoResponse>;

        /**
         * Calls PlayerPublish.
         * @param request Event message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public playerPublish(request: common.IEvent, callback: game.GameService.PlayerPublishCallback): void;

        /**
         * Calls PlayerPublish.
         * @param request Event message or plain object
         * @returns Promise
         */
        public playerPublish(request: common.IEvent): Promise<google.protobuf.Empty>;

        /**
         * Calls Subscribe.
         * @param request SubscribeRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Event
         */
        public subscribe(request: game.ISubscribeRequest, callback: game.GameService.SubscribeCallback): void;

        /**
         * Calls Subscribe.
         * @param request SubscribeRequest message or plain object
         * @returns Promise
         */
        public subscribe(request: game.ISubscribeRequest): Promise<common.Event>;
    }

    namespace GameService {

        /**
         * Callback as used by {@link game.GameService#newGame}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type NewGameCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link game.GameService#getGameInfo}.
         * @param error Error, if any
         * @param [response] GetGameInfoResponse
         */
        type GetGameInfoCallback = (error: (Error|null), response?: game.GetGameInfoResponse) => void;

        /**
         * Callback as used by {@link game.GameService#playerPublish}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type PlayerPublishCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link game.GameService#subscribe}.
         * @param error Error, if any
         * @param [response] Event
         */
        type SubscribeCallback = (error: (Error|null), response?: common.Event) => void;
    }

    /** Properties of a NewGameRequest. */
    interface INewGameRequest {

        /** NewGameRequest gameId */
        gameId?: (number|null);

        /** NewGameRequest players */
        players?: (number[]|null);
    }

    /** Represents a NewGameRequest. */
    class NewGameRequest implements INewGameRequest {

        /**
         * Constructs a new NewGameRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.INewGameRequest);

        /** NewGameRequest gameId. */
        public gameId: number;

        /** NewGameRequest players. */
        public players: number[];

        /**
         * Creates a new NewGameRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NewGameRequest instance
         */
        public static create(properties?: game.INewGameRequest): game.NewGameRequest;

        /**
         * Encodes the specified NewGameRequest message. Does not implicitly {@link game.NewGameRequest.verify|verify} messages.
         * @param message NewGameRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.INewGameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NewGameRequest message, length delimited. Does not implicitly {@link game.NewGameRequest.verify|verify} messages.
         * @param message NewGameRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.INewGameRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NewGameRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NewGameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.NewGameRequest;

        /**
         * Decodes a NewGameRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NewGameRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.NewGameRequest;

        /**
         * Verifies a NewGameRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NewGameRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NewGameRequest
         */
        public static fromObject(object: { [k: string]: any }): game.NewGameRequest;

        /**
         * Creates a plain object from a NewGameRequest message. Also converts values to other types if specified.
         * @param message NewGameRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.NewGameRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NewGameRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for NewGameRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetGameInfoRequest. */
    interface IGetGameInfoRequest {

        /** GetGameInfoRequest gameId */
        gameId?: (number|null);
    }

    /** Represents a GetGameInfoRequest. */
    class GetGameInfoRequest implements IGetGameInfoRequest {

        /**
         * Constructs a new GetGameInfoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IGetGameInfoRequest);

        /** GetGameInfoRequest gameId. */
        public gameId: number;

        /**
         * Creates a new GetGameInfoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetGameInfoRequest instance
         */
        public static create(properties?: game.IGetGameInfoRequest): game.GetGameInfoRequest;

        /**
         * Encodes the specified GetGameInfoRequest message. Does not implicitly {@link game.GetGameInfoRequest.verify|verify} messages.
         * @param message GetGameInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IGetGameInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetGameInfoRequest message, length delimited. Does not implicitly {@link game.GetGameInfoRequest.verify|verify} messages.
         * @param message GetGameInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IGetGameInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.GetGameInfoRequest;

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.GetGameInfoRequest;

        /**
         * Verifies a GetGameInfoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetGameInfoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetGameInfoRequest
         */
        public static fromObject(object: { [k: string]: any }): game.GetGameInfoRequest;

        /**
         * Creates a plain object from a GetGameInfoRequest message. Also converts values to other types if specified.
         * @param message GetGameInfoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.GetGameInfoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetGameInfoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetGameInfoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetGameInfoResponse. */
    interface IGetGameInfoResponse {

        /** GetGameInfoResponse gameId */
        gameId?: (number|null);

        /** GetGameInfoResponse state */
        state?: (common.GameState|null);

        /** GetGameInfoResponse players */
        players?: (common.IPlayerPropertyDto[]|null);

        /** GetGameInfoResponse mapWidth */
        mapWidth?: (number|null);

        /** GetGameInfoResponse mapHeight */
        mapHeight?: (number|null);

        /** GetGameInfoResponse tiles */
        tiles?: (common.ITileDto[]|null);
    }

    /** Represents a GetGameInfoResponse. */
    class GetGameInfoResponse implements IGetGameInfoResponse {

        /**
         * Constructs a new GetGameInfoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IGetGameInfoResponse);

        /** GetGameInfoResponse gameId. */
        public gameId: number;

        /** GetGameInfoResponse state. */
        public state: common.GameState;

        /** GetGameInfoResponse players. */
        public players: common.IPlayerPropertyDto[];

        /** GetGameInfoResponse mapWidth. */
        public mapWidth: number;

        /** GetGameInfoResponse mapHeight. */
        public mapHeight: number;

        /** GetGameInfoResponse tiles. */
        public tiles: common.ITileDto[];

        /**
         * Creates a new GetGameInfoResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetGameInfoResponse instance
         */
        public static create(properties?: game.IGetGameInfoResponse): game.GetGameInfoResponse;

        /**
         * Encodes the specified GetGameInfoResponse message. Does not implicitly {@link game.GetGameInfoResponse.verify|verify} messages.
         * @param message GetGameInfoResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IGetGameInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetGameInfoResponse message, length delimited. Does not implicitly {@link game.GetGameInfoResponse.verify|verify} messages.
         * @param message GetGameInfoResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IGetGameInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetGameInfoResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetGameInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.GetGameInfoResponse;

        /**
         * Decodes a GetGameInfoResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetGameInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.GetGameInfoResponse;

        /**
         * Verifies a GetGameInfoResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetGameInfoResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetGameInfoResponse
         */
        public static fromObject(object: { [k: string]: any }): game.GetGameInfoResponse;

        /**
         * Creates a plain object from a GetGameInfoResponse message. Also converts values to other types if specified.
         * @param message GetGameInfoResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.GetGameInfoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetGameInfoResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetGameInfoResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SubscribeRequest. */
    interface ISubscribeRequest {

        /** SubscribeRequest gameId */
        gameId?: (number|null);

        /** SubscribeRequest types */
        types?: (common.EventType[]|null);
    }

    /** Represents a SubscribeRequest. */
    class SubscribeRequest implements ISubscribeRequest {

        /**
         * Constructs a new SubscribeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.ISubscribeRequest);

        /** SubscribeRequest gameId. */
        public gameId: number;

        /** SubscribeRequest types. */
        public types: common.EventType[];

        /**
         * Creates a new SubscribeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SubscribeRequest instance
         */
        public static create(properties?: game.ISubscribeRequest): game.SubscribeRequest;

        /**
         * Encodes the specified SubscribeRequest message. Does not implicitly {@link game.SubscribeRequest.verify|verify} messages.
         * @param message SubscribeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.ISubscribeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SubscribeRequest message, length delimited. Does not implicitly {@link game.SubscribeRequest.verify|verify} messages.
         * @param message SubscribeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.ISubscribeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SubscribeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SubscribeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.SubscribeRequest;

        /**
         * Decodes a SubscribeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SubscribeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.SubscribeRequest;

        /**
         * Verifies a SubscribeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SubscribeRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SubscribeRequest
         */
        public static fromObject(object: { [k: string]: any }): game.SubscribeRequest;

        /**
         * Creates a plain object from a SubscribeRequest message. Also converts values to other types if specified.
         * @param message SubscribeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game.SubscribeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SubscribeRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SubscribeRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace http_api. */
export namespace http_api {

    /** Properties of a RegisterRequest. */
    interface IRegisterRequest {

        /** RegisterRequest nickname */
        nickname?: (string|null);
    }

    /** Represents a RegisterRequest. */
    class RegisterRequest implements IRegisterRequest {

        /**
         * Constructs a new RegisterRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IRegisterRequest);

        /** RegisterRequest nickname. */
        public nickname: string;

        /**
         * Creates a new RegisterRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterRequest instance
         */
        public static create(properties?: http_api.IRegisterRequest): http_api.RegisterRequest;

        /**
         * Encodes the specified RegisterRequest message. Does not implicitly {@link http_api.RegisterRequest.verify|verify} messages.
         * @param message RegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link http_api.RegisterRequest.verify|verify} messages.
         * @param message RegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.RegisterRequest;

        /**
         * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.RegisterRequest;

        /**
         * Verifies a RegisterRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterRequest
         */
        public static fromObject(object: { [k: string]: any }): http_api.RegisterRequest;

        /**
         * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
         * @param message RegisterRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.RegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RegisterRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RegisterResponse. */
    interface IRegisterResponse {

        /** RegisterResponse apiKey */
        apiKey?: (string|null);

        /** RegisterResponse userId */
        userId?: (number|null);
    }

    /** Represents a RegisterResponse. */
    class RegisterResponse implements IRegisterResponse {

        /**
         * Constructs a new RegisterResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IRegisterResponse);

        /** RegisterResponse apiKey. */
        public apiKey: string;

        /** RegisterResponse userId. */
        public userId: number;

        /**
         * Creates a new RegisterResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterResponse instance
         */
        public static create(properties?: http_api.IRegisterResponse): http_api.RegisterResponse;

        /**
         * Encodes the specified RegisterResponse message. Does not implicitly {@link http_api.RegisterResponse.verify|verify} messages.
         * @param message RegisterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link http_api.RegisterResponse.verify|verify} messages.
         * @param message RegisterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.RegisterResponse;

        /**
         * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.RegisterResponse;

        /**
         * Verifies a RegisterResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterResponse
         */
        public static fromObject(object: { [k: string]: any }): http_api.RegisterResponse;

        /**
         * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
         * @param message RegisterResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.RegisterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RegisterResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ValidateResponse. */
    interface IValidateResponse {

        /** ValidateResponse player */
        player?: (auth.IPlayerInfoDto|null);
    }

    /** Represents a ValidateResponse. */
    class ValidateResponse implements IValidateResponse {

        /**
         * Constructs a new ValidateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IValidateResponse);

        /** ValidateResponse player. */
        public player?: (auth.IPlayerInfoDto|null);

        /**
         * Creates a new ValidateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValidateResponse instance
         */
        public static create(properties?: http_api.IValidateResponse): http_api.ValidateResponse;

        /**
         * Encodes the specified ValidateResponse message. Does not implicitly {@link http_api.ValidateResponse.verify|verify} messages.
         * @param message ValidateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IValidateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ValidateResponse message, length delimited. Does not implicitly {@link http_api.ValidateResponse.verify|verify} messages.
         * @param message ValidateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IValidateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ValidateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ValidateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.ValidateResponse;

        /**
         * Decodes a ValidateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ValidateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.ValidateResponse;

        /**
         * Verifies a ValidateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ValidateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ValidateResponse
         */
        public static fromObject(object: { [k: string]: any }): http_api.ValidateResponse;

        /**
         * Creates a plain object from a ValidateResponse message. Also converts values to other types if specified.
         * @param message ValidateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.ValidateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ValidateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ValidateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetWaitingPlayerCountResponse. */
    interface IGetWaitingPlayerCountResponse {

        /** GetWaitingPlayerCountResponse count */
        count?: (number|null);
    }

    /** Represents a GetWaitingPlayerCountResponse. */
    class GetWaitingPlayerCountResponse implements IGetWaitingPlayerCountResponse {

        /**
         * Constructs a new GetWaitingPlayerCountResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IGetWaitingPlayerCountResponse);

        /** GetWaitingPlayerCountResponse count. */
        public count: number;

        /**
         * Creates a new GetWaitingPlayerCountResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetWaitingPlayerCountResponse instance
         */
        public static create(properties?: http_api.IGetWaitingPlayerCountResponse): http_api.GetWaitingPlayerCountResponse;

        /**
         * Encodes the specified GetWaitingPlayerCountResponse message. Does not implicitly {@link http_api.GetWaitingPlayerCountResponse.verify|verify} messages.
         * @param message GetWaitingPlayerCountResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IGetWaitingPlayerCountResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetWaitingPlayerCountResponse message, length delimited. Does not implicitly {@link http_api.GetWaitingPlayerCountResponse.verify|verify} messages.
         * @param message GetWaitingPlayerCountResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IGetWaitingPlayerCountResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetWaitingPlayerCountResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetWaitingPlayerCountResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.GetWaitingPlayerCountResponse;

        /**
         * Decodes a GetWaitingPlayerCountResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetWaitingPlayerCountResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.GetWaitingPlayerCountResponse;

        /**
         * Verifies a GetWaitingPlayerCountResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetWaitingPlayerCountResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetWaitingPlayerCountResponse
         */
        public static fromObject(object: { [k: string]: any }): http_api.GetWaitingPlayerCountResponse;

        /**
         * Creates a plain object from a GetWaitingPlayerCountResponse message. Also converts values to other types if specified.
         * @param message GetWaitingPlayerCountResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.GetWaitingPlayerCountResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetWaitingPlayerCountResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetWaitingPlayerCountResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GetGameInfoRequest. */
    interface IGetGameInfoRequest {

        /** GetGameInfoRequest gameId */
        gameId?: (number|null);
    }

    /** Represents a GetGameInfoRequest. */
    class GetGameInfoRequest implements IGetGameInfoRequest {

        /**
         * Constructs a new GetGameInfoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IGetGameInfoRequest);

        /** GetGameInfoRequest gameId. */
        public gameId: number;

        /**
         * Creates a new GetGameInfoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetGameInfoRequest instance
         */
        public static create(properties?: http_api.IGetGameInfoRequest): http_api.GetGameInfoRequest;

        /**
         * Encodes the specified GetGameInfoRequest message. Does not implicitly {@link http_api.GetGameInfoRequest.verify|verify} messages.
         * @param message GetGameInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IGetGameInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetGameInfoRequest message, length delimited. Does not implicitly {@link http_api.GetGameInfoRequest.verify|verify} messages.
         * @param message GetGameInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IGetGameInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.GetGameInfoRequest;

        /**
         * Decodes a GetGameInfoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.GetGameInfoRequest;

        /**
         * Verifies a GetGameInfoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetGameInfoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetGameInfoRequest
         */
        public static fromObject(object: { [k: string]: any }): http_api.GetGameInfoRequest;

        /**
         * Creates a plain object from a GetGameInfoRequest message. Also converts values to other types if specified.
         * @param message GetGameInfoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.GetGameInfoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetGameInfoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GetGameInfoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
