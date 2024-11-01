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
        SubscribeNewMatch = 1,
        NewMatch = 2,
        StatePreparing = 3,
        StatePrepared = 4,
        StateWaitingReady = 5,
        StateCountdown = 6,
        StatePlaying = 7,
        StateGameover = 8,
        StateCrash = 9,
        WinConditionSatisfied = 10,
        PlayerReady = 21,
        PlayerMove = 22,
        PlayerGetPowerup = 23,
        PlayerPlantBomb = 24,
        PlayerMoved = 31,
        PlayerDead = 32,
        BombPlanted = 33,
        BombWillExplode = 34,
        BombExploded = 35,
        BoxRemoved = 36,
        PowerupDropped = 37,
        PowerupConsumed = 38
    }

    /** Properties of an Event. */
    interface IEvent {

        /** Event type */
        type?: (common.EventType|null);

        /** Event timestamp */
        timestamp?: (number|Long|null);

        /** Event game_id */
        game_id?: (number|null);

        /** Event new_match */
        new_match?: (common.INewMatchData|null);

        /** Event countdown */
        countdown?: (common.ICountdownData|null);

        /** Event game_over */
        game_over?: (common.IGameOverData|null);

        /** Event crash */
        crash?: (common.ICrashData|null);

        /** Event player_ready */
        player_ready?: (common.IPlayerReadyData|null);

        /** Event player_move */
        player_move?: (common.IPlayerMoveData|null);

        /** Event player_get_powerup */
        player_get_powerup?: (common.IPlayerGetPowerupData|null);

        /** Event player_plant_bomb */
        player_plant_bomb?: (common.IPlayerPlantBombData|null);

        /** Event player_moved */
        player_moved?: (common.IPlayerMovedData|null);

        /** Event player_dead */
        player_dead?: (common.IPlayerDeadData|null);

        /** Event bomb_planted */
        bomb_planted?: (common.IBombPlantedData|null);

        /** Event bomb_will_explode */
        bomb_will_explode?: (common.IBombWillExplodeData|null);

        /** Event bomb_exploded */
        bomb_exploded?: (common.IBombExplodedData|null);

        /** Event box_removed */
        box_removed?: (common.IBoxRemovedData|null);

        /** Event powerup_dropped */
        powerup_dropped?: (common.IPowerupDroppedData|null);

        /** Event powerup_consumed */
        powerup_consumed?: (common.IPowerupConsumedData|null);
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

        /** Event game_id. */
        public game_id: number;

        /** Event new_match. */
        public new_match?: (common.INewMatchData|null);

        /** Event countdown. */
        public countdown?: (common.ICountdownData|null);

        /** Event game_over. */
        public game_over?: (common.IGameOverData|null);

        /** Event crash. */
        public crash?: (common.ICrashData|null);

        /** Event player_ready. */
        public player_ready?: (common.IPlayerReadyData|null);

        /** Event player_move. */
        public player_move?: (common.IPlayerMoveData|null);

        /** Event player_get_powerup. */
        public player_get_powerup?: (common.IPlayerGetPowerupData|null);

        /** Event player_plant_bomb. */
        public player_plant_bomb?: (common.IPlayerPlantBombData|null);

        /** Event player_moved. */
        public player_moved?: (common.IPlayerMovedData|null);

        /** Event player_dead. */
        public player_dead?: (common.IPlayerDeadData|null);

        /** Event bomb_planted. */
        public bomb_planted?: (common.IBombPlantedData|null);

        /** Event bomb_will_explode. */
        public bomb_will_explode?: (common.IBombWillExplodeData|null);

        /** Event bomb_exploded. */
        public bomb_exploded?: (common.IBombExplodedData|null);

        /** Event box_removed. */
        public box_removed?: (common.IBoxRemovedData|null);

        /** Event powerup_dropped. */
        public powerup_dropped?: (common.IPowerupDroppedData|null);

        /** Event powerup_consumed. */
        public powerup_consumed?: (common.IPowerupConsumedData|null);

        /** Event data. */
        public data?: ("new_match"|"countdown"|"game_over"|"crash"|"player_ready"|"player_move"|"player_get_powerup"|"player_plant_bomb"|"player_moved"|"player_dead"|"bomb_planted"|"bomb_will_explode"|"bomb_exploded"|"box_removed"|"powerup_dropped"|"powerup_consumed");

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

        /** CountdownData start_ts */
        start_ts?: (number|Long|null);

        /** CountdownData end_ts */
        end_ts?: (number|Long|null);
    }

    /** Represents a CountdownData. */
    class CountdownData implements ICountdownData {

        /**
         * Constructs a new CountdownData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.ICountdownData);

        /** CountdownData start_ts. */
        public start_ts: (number|Long);

        /** CountdownData end_ts. */
        public end_ts: (number|Long);

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
        reason?: (string|null);

        /** GameOverData winner_user_id */
        winner_user_id?: (number|null);
    }

    /** Represents a GameOverData. */
    class GameOverData implements IGameOverData {

        /**
         * Constructs a new GameOverData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IGameOverData);

        /** GameOverData reason. */
        public reason: string;

        /** GameOverData winner_user_id. */
        public winner_user_id: number;

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

        /** PlayerReadyData user_id */
        user_id?: (number|null);
    }

    /** Represents a PlayerReadyData. */
    class PlayerReadyData implements IPlayerReadyData {

        /**
         * Constructs a new PlayerReadyData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerReadyData);

        /** PlayerReadyData user_id. */
        public user_id: number;

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

        /** PlayerMoveData user_id */
        user_id?: (number|null);

        /** PlayerMoveData x */
        x?: (number|null);

        /** PlayerMoveData y */
        y?: (number|null);

        /** PlayerMoveData pixelX */
        pixelX?: (number|null);

        /** PlayerMoveData pixelY */
        pixelY?: (number|null);
    }

    /** Represents a PlayerMoveData. */
    class PlayerMoveData implements IPlayerMoveData {

        /**
         * Constructs a new PlayerMoveData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerMoveData);

        /** PlayerMoveData user_id. */
        public user_id: number;

        /** PlayerMoveData x. */
        public x: number;

        /** PlayerMoveData y. */
        public y: number;

        /** PlayerMoveData pixelX. */
        public pixelX: number;

        /** PlayerMoveData pixelY. */
        public pixelY: number;

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

        /** PlayerGetPowerupData user_id */
        user_id?: (number|null);

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

        /** PlayerGetPowerupData user_id. */
        public user_id: number;

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

        /** PlayerPlantBombData user_id */
        user_id?: (number|null);

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

        /** PlayerPlantBombData user_id. */
        public user_id: number;

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

        /** PlayerMovedData user_id */
        user_id?: (number|null);

        /** PlayerMovedData x */
        x?: (number|null);

        /** PlayerMovedData y */
        y?: (number|null);

        /** PlayerMovedData pixelX */
        pixelX?: (number|null);

        /** PlayerMovedData pixelY */
        pixelY?: (number|null);
    }

    /** Represents a PlayerMovedData. */
    class PlayerMovedData implements IPlayerMovedData {

        /**
         * Constructs a new PlayerMovedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerMovedData);

        /** PlayerMovedData user_id. */
        public user_id: number;

        /** PlayerMovedData x. */
        public x: number;

        /** PlayerMovedData y. */
        public y: number;

        /** PlayerMovedData pixelX. */
        public pixelX: number;

        /** PlayerMovedData pixelY. */
        public pixelY: number;

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

        /** PlayerDeadData user_id */
        user_id?: (number|null);
    }

    /** Represents a PlayerDeadData. */
    class PlayerDeadData implements IPlayerDeadData {

        /**
         * Constructs a new PlayerDeadData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerDeadData);

        /** PlayerDeadData user_id. */
        public user_id: number;

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

        /** BombPlantedData exploded_at */
        exploded_at?: (number|Long|null);

        /** BombPlantedData user_id */
        user_id?: (number|null);

        /** BombPlantedData user_bombcount */
        user_bombcount?: (number|null);
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

        /** BombPlantedData exploded_at. */
        public exploded_at: (number|Long);

        /** BombPlantedData user_id. */
        public user_id: number;

        /** BombPlantedData user_bombcount. */
        public user_bombcount: number;

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

        /** BombWillExplodeData bomb_firepower */
        bomb_firepower?: (number|null);

        /** BombWillExplodeData user_id */
        user_id?: (number|null);
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

        /** BombWillExplodeData bomb_firepower. */
        public bomb_firepower: number;

        /** BombWillExplodeData user_id. */
        public user_id: number;

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

        /** BombExplodedData bomb_firepower */
        bomb_firepower?: (number|null);

        /** BombExplodedData user_id */
        user_id?: (number|null);

        /** BombExplodedData user_bombcount */
        user_bombcount?: (number|null);
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

        /** BombExplodedData bomb_firepower. */
        public bomb_firepower: number;

        /** BombExplodedData user_id. */
        public user_id: number;

        /** BombExplodedData user_bombcount. */
        public user_bombcount: number;

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

        /** PowerupConsumedData user_id */
        user_id?: (number|null);

        /** PowerupConsumedData x */
        x?: (number|null);

        /** PowerupConsumedData y */
        y?: (number|null);

        /** PowerupConsumedData type */
        type?: (common.PowerupType|null);

        /** PowerupConsumedData user_bombcount */
        user_bombcount?: (number|null);

        /** PowerupConsumedData user_firepower */
        user_firepower?: (number|null);
    }

    /** Represents a PowerupConsumedData. */
    class PowerupConsumedData implements IPowerupConsumedData {

        /**
         * Constructs a new PowerupConsumedData.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPowerupConsumedData);

        /** PowerupConsumedData user_id. */
        public user_id: number;

        /** PowerupConsumedData x. */
        public x: number;

        /** PowerupConsumedData y. */
        public y: number;

        /** PowerupConsumedData type. */
        public type: common.PowerupType;

        /** PowerupConsumedData user_bombcount. */
        public user_bombcount: number;

        /** PowerupConsumedData user_firepower. */
        public user_firepower: number;

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

        /** PlayerPropertyDto user_id */
        user_id?: (number|null);

        /** PlayerPropertyDto x */
        x?: (number|null);

        /** PlayerPropertyDto y */
        y?: (number|null);

        /** PlayerPropertyDto firepower */
        firepower?: (number|null);

        /** PlayerPropertyDto bombcount */
        bombcount?: (number|null);
    }

    /** Represents a PlayerPropertyDto. */
    class PlayerPropertyDto implements IPlayerPropertyDto {

        /**
         * Constructs a new PlayerPropertyDto.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IPlayerPropertyDto);

        /** PlayerPropertyDto user_id. */
        public user_id: number;

        /** PlayerPropertyDto x. */
        public x: number;

        /** PlayerPropertyDto y. */
        public y: number;

        /** PlayerPropertyDto firepower. */
        public firepower: number;

        /** PlayerPropertyDto bombcount. */
        public bombcount: number;

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

        /** RegisterResponse api_key */
        api_key?: (string|null);

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

        /** RegisterResponse api_key. */
        public api_key: string;

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

        /** ValidateRequest api_key */
        api_key?: (string|null);
    }

    /** Represents a ValidateRequest. */
    class ValidateRequest implements IValidateRequest {

        /**
         * Constructs a new ValidateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IValidateRequest);

        /** ValidateRequest api_key. */
        public api_key: string;

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
        nicknames?: (string[]|null);
    }

    /** Represents a GetNicknameResponse. */
    class GetNicknameResponse implements IGetNicknameResponse {

        /**
         * Constructs a new GetNicknameResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: auth.IGetNicknameResponse);

        /** GetNicknameResponse nicknames. */
        public nicknames: string[];

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

        /** PlayerInfoDto user_id */
        user_id?: (number|null);

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

        /** PlayerInfoDto user_id. */
        public user_id: number;

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
         * Callback as used by {@link matchmaking.MatchmakingService#subscribeMatch}.
         * @param error Error, if any
         * @param [response] Event
         */
        type SubscribeMatchCallback = (error: (Error|null), response?: common.Event) => void;
    }

    /** Properties of a MatchmakingRequest. */
    interface IMatchmakingRequest {

        /** MatchmakingRequest user_id */
        user_id?: (number|null);
    }

    /** Represents a MatchmakingRequest. */
    class MatchmakingRequest implements IMatchmakingRequest {

        /**
         * Constructs a new MatchmakingRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: matchmaking.IMatchmakingRequest);

        /** MatchmakingRequest user_id. */
        public user_id: number;

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

        /** NewGameRequest game_id */
        game_id?: (number|null);

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

        /** NewGameRequest game_id. */
        public game_id: number;

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

        /** GetGameInfoRequest game_id */
        game_id?: (number|null);
    }

    /** Represents a GetGameInfoRequest. */
    class GetGameInfoRequest implements IGetGameInfoRequest {

        /**
         * Constructs a new GetGameInfoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IGetGameInfoRequest);

        /** GetGameInfoRequest game_id. */
        public game_id: number;

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

        /** GetGameInfoResponse game_id */
        game_id?: (number|null);

        /** GetGameInfoResponse state */
        state?: (common.GameState|null);

        /** GetGameInfoResponse players */
        players?: (common.IPlayerPropertyDto[]|null);

        /** GetGameInfoResponse map_width */
        map_width?: (number|null);

        /** GetGameInfoResponse map_height */
        map_height?: (number|null);

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

        /** GetGameInfoResponse game_id. */
        public game_id: number;

        /** GetGameInfoResponse state. */
        public state: common.GameState;

        /** GetGameInfoResponse players. */
        public players: common.IPlayerPropertyDto[];

        /** GetGameInfoResponse map_width. */
        public map_width: number;

        /** GetGameInfoResponse map_height. */
        public map_height: number;

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

        /** SubscribeRequest game_id */
        game_id?: (number|null);

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

        /** SubscribeRequest game_id. */
        public game_id: number;

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

    /** Properties of a HttpApiRegisterRequest. */
    interface IHttpApiRegisterRequest {

        /** HttpApiRegisterRequest nickname */
        nickname?: (string|null);
    }

    /** Represents a HttpApiRegisterRequest. */
    class HttpApiRegisterRequest implements IHttpApiRegisterRequest {

        /**
         * Constructs a new HttpApiRegisterRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IHttpApiRegisterRequest);

        /** HttpApiRegisterRequest nickname. */
        public nickname: string;

        /**
         * Creates a new HttpApiRegisterRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HttpApiRegisterRequest instance
         */
        public static create(properties?: http_api.IHttpApiRegisterRequest): http_api.HttpApiRegisterRequest;

        /**
         * Encodes the specified HttpApiRegisterRequest message. Does not implicitly {@link http_api.HttpApiRegisterRequest.verify|verify} messages.
         * @param message HttpApiRegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IHttpApiRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HttpApiRegisterRequest message, length delimited. Does not implicitly {@link http_api.HttpApiRegisterRequest.verify|verify} messages.
         * @param message HttpApiRegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IHttpApiRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HttpApiRegisterRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HttpApiRegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.HttpApiRegisterRequest;

        /**
         * Decodes a HttpApiRegisterRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HttpApiRegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.HttpApiRegisterRequest;

        /**
         * Verifies a HttpApiRegisterRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HttpApiRegisterRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HttpApiRegisterRequest
         */
        public static fromObject(object: { [k: string]: any }): http_api.HttpApiRegisterRequest;

        /**
         * Creates a plain object from a HttpApiRegisterRequest message. Also converts values to other types if specified.
         * @param message HttpApiRegisterRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.HttpApiRegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HttpApiRegisterRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HttpApiRegisterRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HttpApiRegisterResponse. */
    interface IHttpApiRegisterResponse {

        /** HttpApiRegisterResponse api_key */
        api_key?: (string|null);

        /** HttpApiRegisterResponse user_id */
        user_id?: (number|null);
    }

    /** Represents a HttpApiRegisterResponse. */
    class HttpApiRegisterResponse implements IHttpApiRegisterResponse {

        /**
         * Constructs a new HttpApiRegisterResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IHttpApiRegisterResponse);

        /** HttpApiRegisterResponse api_key. */
        public api_key: string;

        /** HttpApiRegisterResponse user_id. */
        public user_id: number;

        /**
         * Creates a new HttpApiRegisterResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HttpApiRegisterResponse instance
         */
        public static create(properties?: http_api.IHttpApiRegisterResponse): http_api.HttpApiRegisterResponse;

        /**
         * Encodes the specified HttpApiRegisterResponse message. Does not implicitly {@link http_api.HttpApiRegisterResponse.verify|verify} messages.
         * @param message HttpApiRegisterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IHttpApiRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HttpApiRegisterResponse message, length delimited. Does not implicitly {@link http_api.HttpApiRegisterResponse.verify|verify} messages.
         * @param message HttpApiRegisterResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IHttpApiRegisterResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HttpApiRegisterResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HttpApiRegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.HttpApiRegisterResponse;

        /**
         * Decodes a HttpApiRegisterResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HttpApiRegisterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.HttpApiRegisterResponse;

        /**
         * Verifies a HttpApiRegisterResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HttpApiRegisterResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HttpApiRegisterResponse
         */
        public static fromObject(object: { [k: string]: any }): http_api.HttpApiRegisterResponse;

        /**
         * Creates a plain object from a HttpApiRegisterResponse message. Also converts values to other types if specified.
         * @param message HttpApiRegisterResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.HttpApiRegisterResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HttpApiRegisterResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HttpApiRegisterResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HttpApiValidateRequest. */
    interface IHttpApiValidateRequest {

        /** HttpApiValidateRequest api_key */
        api_key?: (string|null);
    }

    /** Represents a HttpApiValidateRequest. */
    class HttpApiValidateRequest implements IHttpApiValidateRequest {

        /**
         * Constructs a new HttpApiValidateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IHttpApiValidateRequest);

        /** HttpApiValidateRequest api_key. */
        public api_key: string;

        /**
         * Creates a new HttpApiValidateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HttpApiValidateRequest instance
         */
        public static create(properties?: http_api.IHttpApiValidateRequest): http_api.HttpApiValidateRequest;

        /**
         * Encodes the specified HttpApiValidateRequest message. Does not implicitly {@link http_api.HttpApiValidateRequest.verify|verify} messages.
         * @param message HttpApiValidateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IHttpApiValidateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HttpApiValidateRequest message, length delimited. Does not implicitly {@link http_api.HttpApiValidateRequest.verify|verify} messages.
         * @param message HttpApiValidateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IHttpApiValidateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HttpApiValidateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HttpApiValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.HttpApiValidateRequest;

        /**
         * Decodes a HttpApiValidateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HttpApiValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.HttpApiValidateRequest;

        /**
         * Verifies a HttpApiValidateRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HttpApiValidateRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HttpApiValidateRequest
         */
        public static fromObject(object: { [k: string]: any }): http_api.HttpApiValidateRequest;

        /**
         * Creates a plain object from a HttpApiValidateRequest message. Also converts values to other types if specified.
         * @param message HttpApiValidateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.HttpApiValidateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HttpApiValidateRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HttpApiValidateRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HttpApiValidateResponse. */
    interface IHttpApiValidateResponse {

        /** HttpApiValidateResponse player */
        player?: (auth.IPlayerInfoDto|null);
    }

    /** Represents a HttpApiValidateResponse. */
    class HttpApiValidateResponse implements IHttpApiValidateResponse {

        /**
         * Constructs a new HttpApiValidateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IHttpApiValidateResponse);

        /** HttpApiValidateResponse player. */
        public player?: (auth.IPlayerInfoDto|null);

        /**
         * Creates a new HttpApiValidateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HttpApiValidateResponse instance
         */
        public static create(properties?: http_api.IHttpApiValidateResponse): http_api.HttpApiValidateResponse;

        /**
         * Encodes the specified HttpApiValidateResponse message. Does not implicitly {@link http_api.HttpApiValidateResponse.verify|verify} messages.
         * @param message HttpApiValidateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IHttpApiValidateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HttpApiValidateResponse message, length delimited. Does not implicitly {@link http_api.HttpApiValidateResponse.verify|verify} messages.
         * @param message HttpApiValidateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IHttpApiValidateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HttpApiValidateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HttpApiValidateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.HttpApiValidateResponse;

        /**
         * Decodes a HttpApiValidateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HttpApiValidateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.HttpApiValidateResponse;

        /**
         * Verifies a HttpApiValidateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HttpApiValidateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HttpApiValidateResponse
         */
        public static fromObject(object: { [k: string]: any }): http_api.HttpApiValidateResponse;

        /**
         * Creates a plain object from a HttpApiValidateResponse message. Also converts values to other types if specified.
         * @param message HttpApiValidateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.HttpApiValidateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HttpApiValidateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HttpApiValidateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HttpApiGetGameInfoRequest. */
    interface IHttpApiGetGameInfoRequest {

        /** HttpApiGetGameInfoRequest api_key */
        api_key?: (string|null);

        /** HttpApiGetGameInfoRequest game_id */
        game_id?: (number|null);
    }

    /** Represents a HttpApiGetGameInfoRequest. */
    class HttpApiGetGameInfoRequest implements IHttpApiGetGameInfoRequest {

        /**
         * Constructs a new HttpApiGetGameInfoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: http_api.IHttpApiGetGameInfoRequest);

        /** HttpApiGetGameInfoRequest api_key. */
        public api_key: string;

        /** HttpApiGetGameInfoRequest game_id. */
        public game_id: number;

        /**
         * Creates a new HttpApiGetGameInfoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HttpApiGetGameInfoRequest instance
         */
        public static create(properties?: http_api.IHttpApiGetGameInfoRequest): http_api.HttpApiGetGameInfoRequest;

        /**
         * Encodes the specified HttpApiGetGameInfoRequest message. Does not implicitly {@link http_api.HttpApiGetGameInfoRequest.verify|verify} messages.
         * @param message HttpApiGetGameInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: http_api.IHttpApiGetGameInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HttpApiGetGameInfoRequest message, length delimited. Does not implicitly {@link http_api.HttpApiGetGameInfoRequest.verify|verify} messages.
         * @param message HttpApiGetGameInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: http_api.IHttpApiGetGameInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HttpApiGetGameInfoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HttpApiGetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): http_api.HttpApiGetGameInfoRequest;

        /**
         * Decodes a HttpApiGetGameInfoRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HttpApiGetGameInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): http_api.HttpApiGetGameInfoRequest;

        /**
         * Verifies a HttpApiGetGameInfoRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HttpApiGetGameInfoRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HttpApiGetGameInfoRequest
         */
        public static fromObject(object: { [k: string]: any }): http_api.HttpApiGetGameInfoRequest;

        /**
         * Creates a plain object from a HttpApiGetGameInfoRequest message. Also converts values to other types if specified.
         * @param message HttpApiGetGameInfoRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: http_api.HttpApiGetGameInfoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HttpApiGetGameInfoRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HttpApiGetGameInfoRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
